using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Quiz.Data.Migrations
{
    public partial class AllowNullForQuizAuthorId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Quizzes",
                type: "nvarchar(450)",
                nullable: true,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Quizzes",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: false);
        }
    }
}
