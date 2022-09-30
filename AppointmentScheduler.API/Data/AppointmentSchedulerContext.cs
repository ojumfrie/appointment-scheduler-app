using AppointmentScheduler.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduler.API.Data
{
    public class AppointmentSchedulerContext : DbContext
    {
        public AppointmentSchedulerContext(DbContextOptions<AppointmentSchedulerContext> options)
            : base(options)
        {
        }

        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<AppointmentDetail> AppointmentDetails { get; set; }
        public DbSet<Coach> Coaches { get; set; }
        public DbSet<CoachSchedule> CoachSchedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.SeedCoachAndSchedule();

            // modelBuilder.Entity<Coach>().HasData(
            //     new Coach
            //     { 
            //         Id = 1,
            //         Name = "Jane Doe",
            //         Title = "Professional Gymnast Coach",
            //         Active = 1,
            //         CreatedDate = DateTime.Now
            //     }
            // );

            // modelBuilder.Entity<CoachSchedule>().HasData(
            //     new CoachSchedule
            //     {
            //         Id = 1,
            //         Name = "Wednesday",
            //         CoachId = 1,
            //         StartAvailabilityDate = DateTime.ParseExact("2022-09-21 09:00", "yyyy-MM-dd HH:mm", null),
            //         EndAvailabilityDate = DateTime.ParseExact("2022-09-21 17:00", "yyyy-MM-dd HH:mm", null),
            //         Active = 1,
            //         CreatedDate = DateTime.Now
            //     }
            // );
        }
    }
}
