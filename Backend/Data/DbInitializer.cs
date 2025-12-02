namespace LeaveManagementAPI.Data
{
    using LeaveManagementAPI.Models;
    using Microsoft.AspNetCore.Identity;

    public static class DbInitializer
    {
        public static async Task SeedRolesAndAdmin(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context)
        {
            string[] roles = new[] { "Employee", "Manager", "HR" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                    await roleManager.CreateAsync(new IdentityRole(role));
            }

            // Create test users
            if (await userManager.FindByNameAsync("employee1") == null)
            {
                var user = new ApplicationUser { UserName = "employee1", Email = "employee1@test.com", FullName = "Employee One" };
                await userManager.CreateAsync(user, "Password123!");
                await userManager.AddToRoleAsync(user, "Employee");
            }

            if (await userManager.FindByNameAsync("manager1") == null)
            {
                var user = new ApplicationUser { UserName = "manager1", Email = "manager1@test.com", FullName = "Manager One" };
                await userManager.CreateAsync(user, "Password123!");
                await userManager.AddToRoleAsync(user, "Manager");
            }

            if (await userManager.FindByNameAsync("hr1") == null)
            {
                var user = new ApplicationUser { UserName = "hr1", Email = "hr1@test.com", FullName = "HR One" };
                await userManager.CreateAsync(user, "Password123!");
                await userManager.AddToRoleAsync(user, "HR");
            }

            // ✅ Seed Leave Types if empty
            if (!context.LeaveTypes.Any())
            {
                context.LeaveTypes.AddRange(
                    new LeaveType { Name = "Sick Leave", MaxDaysPerYear = 10 },
                    new LeaveType { Name = "Casual Leave", MaxDaysPerYear = 5 },
                    new LeaveType { Name = "Paid Leave", MaxDaysPerYear = 15 }
                );

                await context.SaveChangesAsync();
            }
        }
    }
}







