using AppointmentScheduler.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduler.API.Data.ViewModels
{
    public class CoachScheduleVM
    {
        public int CoachId { get; set; }
        public DateTime StartAvailabilityDate { get; set; }
        public DateTime EndAvailabilityDate { get; set; }
        public int Active { get; set; }
    }
}
