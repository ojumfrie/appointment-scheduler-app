using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduler.API.Data.ViewModels
{
    public class AppointmentVM
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int Active { get; set; }

        public AppointmentDetailVM? Details { get; set; }
    }
}
