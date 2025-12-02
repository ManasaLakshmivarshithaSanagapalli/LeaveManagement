namespace LeaveManagementAPI.DTOs.LeaveRequests
{
    public class LeaveRequestDto
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public string UserName { get; set; }

        public int LeaveTypeId { get; set; }
        public string LeaveType { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalDays { get; set; }

        public string Reason { get; set; }
        public string Status { get; set; }

        public string? ApproverId { get; set; }
        public string? ApproverName { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}



