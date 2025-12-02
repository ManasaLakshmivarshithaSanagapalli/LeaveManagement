using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeaveManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddApproverNameToLeaveRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApproverName",
                table: "LeaveRequests",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "LeaveRequests",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApproverName",
                table: "LeaveRequests");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "LeaveRequests");
        }
    }
}
