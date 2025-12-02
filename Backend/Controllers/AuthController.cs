using LeaveManagementAPI.Models;
using LeaveManagementAPI.DTOs;
using LeaveManagementAPI.DTOs.Login;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LeaveManagementAPI.Services;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _config;
    private readonly IEmailService _emailService;

    public AuthController(UserManager<ApplicationUser> userManager, IConfiguration config, IEmailService emailService)
    {
        _userManager = userManager;
        _config = config;
        _emailService = emailService;
        
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] loginDto dto)
    {
        var user = await _userManager.FindByNameAsync(dto.UserName);
        if (user == null)
            return NotFound("User not found.");             // <-- return 404 when user missing

        if (!await _userManager.CheckPasswordAsync(user, dto.Password))
            return Unauthorized("Invalid password.");      // <-- return 401 when password wrong

        var roles = await _userManager.GetRolesAsync(user);

        var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Name, user.UserName)
    };

        claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (await _userManager.FindByNameAsync(dto.UserName) != null)
            return BadRequest("Username already exists.");

        var user = new ApplicationUser
        {
            UserName = dto.UserName,
            Email = dto.Email,
            FullName = dto.FullName
        };

        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        // Assign default role
        await _userManager.AddToRoleAsync(user, "Employee");

        return Ok("Registration successful! Please log in.");
    }
    [HttpPost("forgotpassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgetPasswordDto dto)
    {
        //var user = await _userManager.FindByNameAsync(dto.UserName);
        var user = await _userManager.FindByEmailAsync(dto.Email);

        // Always return OK even if user does not exist
        if (user == null)
            return Ok("If the account exists, a password reset link has been sent to your email.");

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        //var resetLink = $"{_config["Frontend:Url"]}/reset-password?userId={user.Id}&token={Uri.EscapeDataString(token)}";

        //await _emailService.SendEmailAsync(
        //    user.Email,
        //    "Reset Your Password",
        //    $"Click the link to reset your password: {resetLink}"
        //);
        var frontendUrl = _config["FrontendUrl"];
        var resetLink = $"{frontendUrl}/ResetPassword?userId={user.Id}&token={Uri.EscapeDataString(token)}";

        await _emailService.SendEmailAsync(
            user.Email,
            "Reset Your Password",
            resetLink // ONLY send clean URL
        );


        return Ok("If the account exists, a password reset link has been sent to your email.");
    }

    [HttpPost("resetpassword")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
    {
        var user = await _userManager.FindByIdAsync(dto.UserId);
        if (user == null)
            return BadRequest("Invalid user.");

        var result = await _userManager.ResetPasswordAsync(user, dto.Token, dto.NewPassword);

        if (!result.Succeeded)
            return BadRequest(result.Errors.Select(e => e.Description));

        return Ok("Password has been reset successfully.");
    }



}
