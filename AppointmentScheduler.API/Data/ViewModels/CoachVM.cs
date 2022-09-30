using AppointmentScheduler.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduler.API.Data.ViewModels
{
    public class CoachVM
    {
        public string? Name { get; set; }
        public string? Title { get; set; }
        public int Active { get; set; }

        public List<CoachScheduleVM>? Schedules { get; set; }
    }
}
