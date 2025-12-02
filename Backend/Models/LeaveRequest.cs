namespace LeaveManagementAPI.Models
{
    using System.ComponentModel.DataAnnotations;

    public class LeaveRequest
    {
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string UserName { get; set; }

        [Required]
        public int LeaveTypeId { get; set; }
        public LeaveType LeaveType { get; set; }


        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public decimal TotalDays { get; set; }
        public string Reason { get; set; }
        public LeaveStatus Status { get; set; } = LeaveStatus.Pending;

        public string? ApproverId { get; set; }
        public ApplicationUser? Approver { get; set; }
        public string ? ApproverName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }

}
