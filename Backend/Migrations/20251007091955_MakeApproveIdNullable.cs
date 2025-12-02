using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeaveManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class MakeApproveIdNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ApproverId",
                table: "LeaveRequests",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_ApproverId",
                table: "LeaveRequests",
                column: "ApproverId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_AspNetUsers_ApproverId",
                table: "LeaveRequests",
                column: "ApproverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_AspNetUsers_ApproverId",
                table: "LeaveRequests");

            migrationBuilder.DropIndex(
                name: "IX_LeaveRequests_ApproverId",
                table: "LeaveRequests");

            migrationBuilder.UpdateData(
                table: "LeaveRequests",
                keyColumn: "ApproverId",
                keyValue: null,
                column: "ApproverId",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "ApproverId",
                table: "LeaveRequests",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
