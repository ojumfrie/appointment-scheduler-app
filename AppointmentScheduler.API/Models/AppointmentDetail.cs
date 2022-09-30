using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduler.API.Models
{
    public class AppointmentDetail
    {
        public int Id { get; set; }
        public int AppointmentId { get; set; }
        [Required]
        public int CoachId { get; set; }
        [Required]
        public int CoachScheduleId { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public int Active { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
