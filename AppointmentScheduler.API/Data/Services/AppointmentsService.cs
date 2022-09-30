using AppointmentScheduler.API.Data.ViewModels;
using AppointmentScheduler.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduler.API.Data.Services
{
    public class AppointmentsService
    {
        private AppointmentSchedulerContext _context;

        public AppointmentsService(AppointmentSchedulerContext context)
        {
            _context = context;
        }

        public List<Appointment> GetAll()
        {
            return _context.Appointments.ToList();
        }

        public List<object> GetAllWithDetails()
        {
            List<object> list = new List<object>();

            var appointments = _context.Appointments
                    .FromSqlRaw("SELECT a.* " +
                                "FROM Appointments a " +
                                "LEFT OUTER JOIN AppointmentDetails ad ON a.Id = ad.AppointmentId " +
                                "WHERE a.Active = 1 AND ad.Active = 1 ")
                    .ToList();
            list.Add(appointments);

            var appointmentDetails = _context.AppointmentDetails
                    .FromSqlRaw("SELECT ad.* " +
                                "FROM AppointmentDetails ad " +
                                "LEFT OUTER JOIN Appointments a ON ad.AppointmentId = a.Id " +
                                "WHERE a.Active = 1 AND ad.Active = 1 ")
                    .ToList();
            list.Add(appointmentDetails);

            return list;
        }

        public Appointment GetById(int id)
        {
            var _appointment = _context.Appointments.FirstOrDefault(x => x.Id == id);

            if (_appointment == null)
            {
                return new Appointment();
            }

            return _appointment;
        }

        public List<object> GetByIdWithCoachesAndSchedules(int id)
        {
            List<object> list = new List<object>();

            var appointment = _context.Appointments
                    .FromSqlRaw("SELECT TOP(1) * FROM Appointments WHERE Id = " + id)
                    .ToList();
            list.Add(appointment);

            var appointmentDetails = _context.AppointmentDetails
                    .FromSqlRaw("SELECT TOP(1) * FROM AppointmentDetails WHERE Id = " + id)
                    .ToList();
            list.Add(appointmentDetails);

            var coaches = _context.Coaches
                    .FromSqlRaw("SELECT * FROM Coaches WHERE Active = 1 ")
                    .ToList();
            list.Add(coaches);

            var coachSchedules = _context.CoachSchedules
                    .FromSqlRaw("SELECT * FROM CoachSchedules WHERE Active = 1 ")
                    .ToList();
            list.Add(coachSchedules);

            return list;
        }

        public bool Add(AppointmentVM appointment)
        {
            bool isAppSuccessful = false;
            bool isAppDetailsSuccessful = false;

            // if (appointment != null)
            // {
                var _appointment = new Appointment() {
                    Title = appointment.Title,
                    Description = appointment.Description,
                    Active = appointment.Active,
                    CreatedDate = DateTime.Now
                };

                _context.Appointments.Add(_appointment);
                _context.SaveChanges();
                isAppSuccessful = true;

                if (appointment.Details != null)
                {
                    var _appointmentDetail = new AppointmentDetail() {
                        AppointmentId = _appointment.Id,
                        CoachId = appointment.Details.CoachId,
                        CoachScheduleId = appointment.Details.CoachScheduleId,
                        StartDate = appointment.Details.StartDate,
                        EndDate = appointment.Details.EndDate,
                        Active = appointment.Details.Active,
                        CreatedDate = DateTime.Now
                    };

                    _context.AppointmentDetails.Add(_appointmentDetail);
                    _context.SaveChanges();                
                    isAppDetailsSuccessful = true;
                }
            // }

            return (isAppSuccessful && isAppDetailsSuccessful)?true:false;
        }

        public bool UpdateById(int id, AppointmentVM appointment)
        {
            bool isAppSuccessful = false;
            bool isAppDetailsSuccessful = false;
            var _appointment = _context.Appointments.FirstOrDefault(x => x.Id == id);

            if (_appointment != null)
            {
                _appointment.Title = appointment.Title;
                _appointment.Description = appointment.Description;
                _appointment.Active = appointment.Active;
                _appointment.UpdatedDate = DateTime.Now;

                _context.SaveChanges();
                isAppSuccessful = true;

                if (appointment.Details != null)
                {
                    var _appointmentDetail = new AppointmentDetail() {
                        AppointmentId = id,
                        CoachId = appointment.Details.CoachId,
                        CoachScheduleId = appointment.Details.CoachScheduleId,
                        StartDate = appointment.Details.StartDate,
                        EndDate = appointment.Details.EndDate,
                        Active = appointment.Details.Active,
                        UpdatedDate = DateTime.Now
                    };

                    _context.SaveChanges();                
                    isAppDetailsSuccessful = true;
                }
            }

            return (isAppSuccessful && isAppDetailsSuccessful)?true:false;
        }

        public bool DeleteById(int id)
        {
            bool isSuccessful = false;
            var _appointment = _context.Appointments.FirstOrDefault(x => x.Id == id);

            if (_appointment != null)
            {
                _context.Remove(_appointment);
                _context.SaveChanges();
                isSuccessful = true;
            }

            return isSuccessful;
        }
    }
}
