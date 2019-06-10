using Microsoft.EntityFrameworkCore.Migrations;

namespace TicTacToe.WebApi.Migrations
{
    public partial class Anonymous : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isAnonymous",
                table: "AppUser",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isAnonymous",
                table: "AppUser");
        }
    }
}
