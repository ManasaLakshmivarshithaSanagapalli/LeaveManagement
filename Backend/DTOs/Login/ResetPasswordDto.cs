namespace LeaveManagementAPI.DTOs.Login
{
    public class ResetPasswordDto
    {
        //public string UserName { get; set; } 
        public string UserId { get; set; }   
        public string Token { get; set; }    
        public string NewPassword { get; set; }
    }

}
