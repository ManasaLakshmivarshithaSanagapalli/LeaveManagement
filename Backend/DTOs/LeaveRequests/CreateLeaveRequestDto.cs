namespace LeaveManagementAPI.DTOs.LeaveRequests
{
        public class CreateLeaveRequestDto
        {
            public string UserId { get; set; }
            public int LeaveTypeId { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public string Reason { get; set; }
        }


}
