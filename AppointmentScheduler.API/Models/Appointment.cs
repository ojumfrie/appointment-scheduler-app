using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduler.API.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        [Required]
        public string? Title { get; set; }
        public string? Description { get; set; }
        [Required]
        public int Active { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
