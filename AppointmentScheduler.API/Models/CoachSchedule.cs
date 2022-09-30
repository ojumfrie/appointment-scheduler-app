using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduler.API.Models
{
    public class CoachSchedule
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        [Required]        
        public int CoachId { get; set; }
        public string Timezone { get; set; }
        [Required]
        // public DateTime StartAvailabilityDate { get; set; }
        public string StartTime { get; set; }
        [Required]
        // public DateTime EndAvailabilityDate { get; set; }
        public string EndTime { get; set; }
        [Required]
        public int Active { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
