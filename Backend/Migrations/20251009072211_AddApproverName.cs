using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeaveManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddApproverName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ApproverName",
                table: "LeaveRequests",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "LeaveRequests",
                keyColumn: "ApproverName",
                keyValue: null,
                column: "ApproverName",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "ApproverName",
                table: "LeaveRequests",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
