using Microsoft.EntityFrameworkCore.Migrations;

namespace TicTacToe.WebApi.Migrations
{
    public partial class Groups : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_AppUser_GroupId",
                table: "UserGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_Groups_UserId",
                table: "UserGroups");

            migrationBuilder.AddColumn<bool>(
                name: "IsAnonymous",
                table: "AppUser",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_Groups_GroupId",
                table: "UserGroups",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_AppUser_UserId",
                table: "UserGroups",
                column: "UserId",
                principalTable: "AppUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_Groups_GroupId",
                table: "UserGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_AppUser_UserId",
                table: "UserGroups");

            migrationBuilder.DropColumn(
                name: "IsAnonymous",
                table: "AppUser");

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_AppUser_GroupId",
                table: "UserGroups",
                column: "GroupId",
                principalTable: "AppUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_Groups_UserId",
                table: "UserGroups",
                column: "UserId",
                principalTable: "Groups",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
