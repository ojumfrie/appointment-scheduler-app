using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppointmentScheduler.API.Data.Migrations
{
    public partial class createdatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppointmentDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AppointmentId = table.Column<int>(type: "int", nullable: false),
                    CoachId = table.Column<int>(type: "int", nullable: false),
                    CoachScheduleId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Active = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Coaches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coaches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CoachSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CoachId = table.Column<int>(type: "int", nullable: false),
                    Timezone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Active = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoachSchedules", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "CoachSchedules",
                columns: new[] { "Id", "Active", "CoachId", "CreatedDate", "EndTime", "Name", "StartTime", "Timezone" },
                values: new object[,]
                {
                    { 1, 1, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9664), "5:00 PM", "Wednesday", "8:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 2, 1, 2, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9666), "5:30 PM", "Monday", "9:00 AM", "(GMT-06:00) America/North_Dakota/New_Salem" },
                    { 3, 1, 3, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9666), "4:00 PM", "Tuesday", "8:00 AM", "(GMT-06:00) America/North_Dakota/New_Salem" },
                    { 4, 1, 4, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9668), "4:00 PM", "Thursday", "9:00 AM", "(GMT-06:00) America/North_Dakota/New_Salem" },
                    { 5, 1, 5, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9669), "2:00 PM", "Friday", "7:00 AM", "(GMT-06:00) America/North_Dakota/New_Salem" },
                    { 6, 1, 6, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9670), "10:00 AM", "Tuesday", "8:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 7, 1, 7, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9671), "6:00 PM", "Wednesday", "11:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 8, 1, 8, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9672), "3:00 PM", "Saturday", "9:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 9, 1, 9, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9673), "3:00 PM", "Sunday", "8:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 10, 1, 10, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9674), "10:00 AM", "Monday", "8:00 AM", "(GMT-09:00) America/Yakutat" },
                    { 11, 1, 11, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9674), "1:00 PM", "Tuesday", "11:00 AM", "(GMT-09:00) America/Yakutat" },
                    { 12, 1, 12, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9675), "10:00 AM", "Wednesday", "8:00 AM", "(GMT-09:00) America/Yakutat" },
                    { 13, 1, 13, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9676), "11:00 AM", "Saturday", "8:00 AM", "(GMT-09:00) America/Yakutat" },
                    { 14, 1, 14, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9677), "9:00 AM", "Sunday", "7:00 AM", "(GMT-09:00) America/Yakutat" },
                    { 15, 1, 15, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9678), "3:00 PM", "Monday", "9:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 16, 1, 16, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9679), "1:00 PM", "Tuesday", "6:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 17, 1, 17, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9680), "11:00 AM", "Wednesday", "6:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 18, 1, 18, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9680), "12:00 PM", "Friday", "8:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 19, 1, 19, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9681), "4:00 PM", "Saturday", "9:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 20, 1, 20, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9682), "10:00 AM", "Sunday", "8:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 21, 1, 21, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9683), "2:00 PM", "Thursday", "7:00 AM", "(GMT-06:00) Central Time (US & Canada)" },
                    { 22, 1, 22, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9684), "5:00 PM", "Thursday", "3:00 PM", "(GMT-06:00) Central Time (US & Canada)" }
                });

            migrationBuilder.InsertData(
                table: "Coaches",
                columns: new[] { "Id", "Active", "CreatedDate", "Name", "Title", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9499), "Jane Doe", "Professional Gymnast Coach", null },
                    { 2, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9510), "Christy Schumm", "Professional Gymnast Coach", null },
                    { 3, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9511), "Christy Schumm", "Professional Gymnast Coach", null },
                    { 4, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9511), "Christy Schumm", "Professional Gymnast Coach", null },
                    { 5, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9512), "Christy Schumm", "Professional Gymnast Coach", null },
                    { 6, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9513), "Natalia Stanton Jr.", "Professional Gymnast Coach", null },
                    { 7, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9513), "Natalia Stanton Jr.", "Professional Gymnast Coach", null },
                    { 8, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9514), "Natalia Stanton Jr.", "Professional Gymnast Coach", null },
                    { 9, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9515), "Natalia Stanton Jr.", "Professional Gymnast Coach", null },
                    { 10, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9516), "Nola Murazik V", "Professional Gymnast Coach", null },
                    { 11, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9516), "Nola Murazik V", "Professional Gymnast Coach", null },
                    { 12, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9517), "Nola Murazik V", "Professional Gymnast Coach", null },
                    { 13, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9518), "Nola Murazik V", "Professional Gymnast Coach", null },
                    { 14, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9519), "Nola Murazik V", "Professional Gymnast Coach", null },
                    { 15, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9519), "Elyssa O'Kon", "Professional Gymnast Coach", null },
                    { 16, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9520), "Elyssa O'Kon", "Professional Gymnast Coach", null },
                    { 17, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9521), "Elyssa O'Kon", "Professional Gymnast Coach", null },
                    { 18, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9521), "Elyssa O'Kon", "Professional Gymnast Coach", null },
                    { 19, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9522), "Elyssa O'Kon", "Professional Gymnast Coach", null },
                    { 20, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9523), "Elyssa O'Kon", "Professional Gymnast Coach", null }
                });

            migrationBuilder.InsertData(
                table: "Coaches",
                columns: new[] { "Id", "Active", "CreatedDate", "Name", "Title", "UpdatedDate" },
                values: new object[] { 21, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9523), "Dr. Geovany Keebler", "Professional Gymnast Coach", null });

            migrationBuilder.InsertData(
                table: "Coaches",
                columns: new[] { "Id", "Active", "CreatedDate", "Name", "Title", "UpdatedDate" },
                values: new object[] { 22, 1, new DateTime(2022, 9, 21, 15, 41, 51, 544, DateTimeKind.Local).AddTicks(9524), "Dr. Geovany Keebler", "Professional Gymnast Coach", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentDetails");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Coaches");

            migrationBuilder.DropTable(
                name: "CoachSchedules");
        }
    }
}
