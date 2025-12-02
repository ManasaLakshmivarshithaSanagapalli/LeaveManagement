using System.Security.Claims;
using AutoMapper;
using LeaveManagementAPI.DTOs.LeaveRequests;
using LeaveManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LeaveManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveRequestsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public LeaveRequestsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [Authorize(Roles = "Employee")]
        [HttpPost]
        public async Task<IActionResult> CreateLeaveRequest([FromBody] CreateLeaveRequestDto dto)
        {
            var leaveRequest = _mapper.Map<LeaveRequest>(dto);

            // Set calculated fields
            leaveRequest.Status = LeaveStatus.Pending;
            leaveRequest.CreatedAt = DateTime.UtcNow;
            leaveRequest.UpdatedAt = DateTime.UtcNow;
            leaveRequest.TotalDays = (dto.EndDate - dto.StartDate).Days + 1;

            // Get employee name from DB
            var user = await _context.Users.FindAsync(dto.UserId);
            leaveRequest.UserName = user?.FullName ?? "Unknown";

            // Get leave type name
            var leaveType = await _context.LeaveTypes.FindAsync(dto.LeaveTypeId);
            leaveRequest.LeaveType = leaveType;

            _context.LeaveRequests.Add(leaveRequest);
            await _context.SaveChangesAsync();

            var response = _mapper.Map<LeaveRequestDto>(leaveRequest);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var requests = await _context.LeaveRequests
                .Include(l => l.User)
                .Include(l => l.LeaveType)
                .Include(l => l.Approver)
                .ToListAsync();

            return Ok(_mapper.Map<List<LeaveRequestDto>>(requests));
        }

        [HttpPut("{id}/approve")]
        [Authorize(Roles = "Manager,HR")]
        public async Task<IActionResult> ApproveLeave(int id)
        {
            //var request = await _context.LeaveRequests.FindAsync(id);
            var request = await _context.LeaveRequests
                          .Include(l => l.User)
                          .Include(l => l.LeaveType)
                          .Include(l => l.Approver)
                          .FirstOrDefaultAsync(l => l.Id == id);

            if (request == null) return NotFound();
            if (request.Status != LeaveStatus.Pending)
                return BadRequest("Leave request is already processed.");

            // Current approver
            var approverId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(approverId)) return Unauthorized("User ID not found in token.");

            var approver = await _context.Users.FindAsync(approverId);

            request.Status = LeaveStatus.Approved;
            request.ApproverId = approverId;
            request.ApproverName = approver?.FullName ?? "Unknown";
            request.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(_mapper.Map<LeaveRequestDto>(request));
        }

        [HttpPut("{id}/reject")]
        [Authorize(Roles = "Manager,HR")]
        public async Task<IActionResult> RejectLeave(int id)
        {
            //var request = await _context.LeaveRequests.FindAsync(id);
            var request = await _context.LeaveRequests
                     .Include(l => l.User)
                     .Include(l => l.LeaveType)
                     .Include(l => l.Approver)
                     .FirstOrDefaultAsync(l => l.Id == id);

            if (request == null) return NotFound();
            if (request.Status != LeaveStatus.Pending)
                return BadRequest("Leave request is already processed.");

            var approverId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(approverId)) return Unauthorized("User ID not found in token.");

            var approver = await _context.Users.FindAsync(approverId);

            request.Status = LeaveStatus.Rejected;
            request.ApproverId = approverId;
            request.ApproverName = approver?.FullName ?? "Unknown";
            request.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(_mapper.Map<LeaveRequestDto>(request));
        }
    }
}
