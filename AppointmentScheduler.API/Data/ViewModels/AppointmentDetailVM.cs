namespace AppointmentScheduler.API.Data.ViewModels
{
    public class AppointmentDetailVM
    {
        public int AppointmentId { get; set; }
        public int CoachId { get; set; }
        public int CoachScheduleId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Active { get; set; }
    }
}
