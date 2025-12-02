using LeaveManagementAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<LeaveRequest> LeaveRequests { get; set; }
    public DbSet<LeaveType> LeaveTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<LeaveRequest>()
            .HasOne(l => l.User)
            .WithMany()
            .HasForeignKey(l => l.UserId);

        builder.Entity<LeaveRequest>()
            .HasOne(l => l.LeaveType)
            .WithMany()
            .HasForeignKey(l => l.LeaveTypeId);

        builder.Entity<LeaveRequest>()
        .Property(l => l.TotalDays)
        .HasPrecision(5, 2);
    }
}



