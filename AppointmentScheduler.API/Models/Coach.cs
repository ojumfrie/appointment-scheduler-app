using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduler.API.Models
{
    public class Coach
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? Title { get; set; }
        [Required]
        public int Active { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
