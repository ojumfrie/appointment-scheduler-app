using AppointmentScheduler.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduler.API.Data
{
    public static class ModelBuilderExtension
    {
        public static void SeedCoachAndSchedule(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Coach>().HasData(
                new Coach
                { 
                    Id = 1,
                    Name = "Jane Doe",
                    Title = "Professional Gymnast Coach",
                    Active = 1,
                    CreatedDate = DateTime.Now
                },
                new Coach { Id = 2, Name = "Christy Schumm", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 3, Name = "Christy Schumm", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 4, Name = "Christy Schumm", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 5, Name = "Christy Schumm", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 6, Name = "Natalia Stanton Jr.", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 7, Name = "Natalia Stanton Jr.", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 8, Name = "Natalia Stanton Jr.", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 9, Name = "Natalia Stanton Jr.", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 10, Name = "Nola Murazik V", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 11, Name = "Nola Murazik V", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 12, Name = "Nola Murazik V", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 13, Name = "Nola Murazik V", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 14, Name = "Nola Murazik V", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 15, Name = "Elyssa O'Kon", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 16, Name = "Elyssa O'Kon", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 17, Name = "Elyssa O'Kon", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 18, Name = "Elyssa O'Kon", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 19, Name = "Elyssa O'Kon", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 20, Name = "Elyssa O'Kon", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 21, Name = "Dr. Geovany Keebler", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }, 
                new Coach { Id = 22, Name = "Dr. Geovany Keebler", Title = "Professional Gymnast Coach", Active = 1, CreatedDate = DateTime.Now }
            );

            modelBuilder.Entity<CoachSchedule>().HasData(
                new CoachSchedule
                {
                    Id = 1,
                    Name = "Wednesday",
                    CoachId = 1,
                    Timezone = "(GMT-06:00) Central Time (US & Canada)",
                    StartTime = "8:00 AM",
                    EndTime = "5:00 PM",
                    Active = 1,
                    CreatedDate = DateTime.Now
                },
                new CoachSchedule { Id = 2, Name = "Monday", CoachId = 2, Timezone = "(GMT-06:00) America/North_Dakota/New_Salem", StartTime = "9:00 AM", EndTime = "5:30 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 3, Name = "Tuesday", CoachId = 3, Timezone = "(GMT-06:00) America/North_Dakota/New_Salem", StartTime = "8:00 AM", EndTime = "4:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 4, Name = "Thursday", CoachId = 4, Timezone = "(GMT-06:00) America/North_Dakota/New_Salem", StartTime = "9:00 AM", EndTime = "4:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 5, Name = "Friday", CoachId = 5, Timezone = "(GMT-06:00) America/North_Dakota/New_Salem", StartTime = "7:00 AM", EndTime = "2:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 6, Name = "Tuesday", CoachId = 6, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "8:00 AM", EndTime = "10:00 AM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 7, Name = "Wednesday", CoachId = 7, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "11:00 AM", EndTime = "6:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 8, Name = "Saturday", CoachId = 8, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "9:00 AM", EndTime = "3:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 9, Name = "Sunday", CoachId = 9, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "8:00 AM", EndTime = "3:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 10, Name = "Monday", CoachId = 10, Timezone = "(GMT-09:00) America/Yakutat", StartTime = "8:00 AM", EndTime = "10:00 AM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 11, Name = "Tuesday", CoachId = 11, Timezone = "(GMT-09:00) America/Yakutat", StartTime = "11:00 AM", EndTime = "1:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 12, Name = "Wednesday", CoachId = 12, Timezone = "(GMT-09:00) America/Yakutat", StartTime = "8:00 AM", EndTime = "10:00 AM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 13, Name = "Saturday", CoachId = 13, Timezone = "(GMT-09:00) America/Yakutat", StartTime = "8:00 AM", EndTime = "11:00 AM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 14, Name = "Sunday", CoachId = 14, Timezone = "(GMT-09:00) America/Yakutat", StartTime = "7:00 AM", EndTime = "9:00 AM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 15, Name = "Monday", CoachId = 15, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "9:00 AM", EndTime = "3:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 16, Name = "Tuesday", CoachId = 16, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "6:00 AM", EndTime = "1:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 17, Name = "Wednesday", CoachId = 17, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "6:00 AM", EndTime = "11:00 AM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 18, Name = "Friday", CoachId = 18, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "8:00 AM", EndTime = "12:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 19, Name = "Saturday", CoachId = 19, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "9:00 AM", EndTime = "4:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 20, Name = "Sunday", CoachId = 20, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "8:00 AM", EndTime = "10:00 AM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 21, Name = "Thursday", CoachId = 21, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "7:00 AM", EndTime = "2:00 PM", Active = 1, CreatedDate = DateTime.Now }, 
                new CoachSchedule { Id = 22, Name = "Thursday", CoachId = 22, Timezone = "(GMT-06:00) Central Time (US & Canada)", StartTime = "3:00 PM", EndTime = "5:00 PM", Active = 1, CreatedDate = DateTime.Now }
            );
        }
    }
}
