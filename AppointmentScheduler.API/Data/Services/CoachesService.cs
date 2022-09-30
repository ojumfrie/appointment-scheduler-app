using AppointmentScheduler.API.Data.ViewModels;
using AppointmentScheduler.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AppointmentScheduler.API.Data.Services
{
    public class CoachesService
    {
        private AppointmentSchedulerContext _context;

        public CoachesService(AppointmentSchedulerContext context)
        {
            _context = context;
        }

        public List<object> GetAllCoachesAndSchedules()
        {
            List<object> list = new List<object>();

            var coaches = _context.Coaches
                    .FromSqlRaw("SELECT * FROM Coaches ")
                    .ToList();
            list.Add(coaches);

            var coachSchedules = _context.CoachSchedules
                    .FromSqlRaw("SELECT * FROM CoachSchedules ")
                    .ToList();
            list.Add(coachSchedules);

            var appointments = _context.Appointments
                    .FromSqlRaw("SELECT * FROM Appointments ")
                    .ToList();
            list.Add(appointments);

            var appointmentDetails = _context.AppointmentDetails
                    .FromSqlRaw("SELECT * FROM AppointmentDetails ")
                    .ToList();
            list.Add(appointmentDetails);

            return list;
        }

        public List<object> GetAllCoachesAndSchedulesV2()
        {
            List<object> list = new List<object>();

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

        public dynamic GetAllWithSchedules()
        {
            var coachesAndSchedules = _context.CoachSchedules
                    .FromSqlRaw("SELECT c.Id, c.Name, c.Title, cs.Id AS [ScheduleId], cs.StartAvailabilityDate, cs.EndAvailabilityDate, cs.CoachId, cs.Active AS [ScheduleActive], cs.CreatedDate, c.Active " +
                                "FROM Coaches c " +
                                    "LEFT OUTER JOIN CoachSchedules cs ON c.Id = cs.CoachId " +
                                "WHERE c.Active = 1 AND cs.Active = 1 ")
                    .ToList();

            return coachesAndSchedules;
        }

        public List<object> GetById(int id)
        {
            List<object> list = new List<object>();

            var coaches = _context.Coaches
                    .FromSqlRaw("SELECT c.Id, c.Name, c.Title, c.Active, c.UpdatedDate, c.CreatedDate " +
                                "FROM Coaches c " +
                                    "LEFT OUTER JOIN CoachSchedules cs ON c.Id = cs.CoachId " +
                                "WHERE c.Id = " + id)
                    .ToList();

            list.Add(coaches);

            var schedules = _context.CoachSchedules
                    .FromSqlRaw("SELECT *" +
                                "FROM CoachSchedules " +
                                "WHERE CoachId = " + id)
                    .ToList();

            list.Add(schedules);

            return list;
        }

        public bool Add(CoachVM coach)
        {
            bool isCoachSuccess = false;
            bool isScheduleSuccess = false;

            var _coach = new Coach()
            {
                Name = coach.Name,
                Title = coach.Title,
                Active = coach.Active,
                CreatedDate = DateTime.Now,
            };

            _context.Coaches.Add(_coach);
            _context.SaveChanges();
            isCoachSuccess = true;

            if (coach.Schedules != null)
            {
                foreach (CoachScheduleVM sched in coach.Schedules)
                {
                    if (sched.CoachId == 0)
                    {
                        var _coachSchedule = new CoachSchedule()
                        {
                            CoachId = _coach.Id,
                            StartTime = sched.StartAvailabilityDate.ToString(),
                            EndTime = sched.EndAvailabilityDate.ToString(),
                            Active = 1,
                            CreatedDate = DateTime.Now
                        };
                        _context.CoachSchedules.Add(_coachSchedule);
                    }
                }
                _context.SaveChanges();
                isScheduleSuccess = true;
            }

            return (isCoachSuccess && isScheduleSuccess)?true:false;
        }

        public bool UpdateById(int id, CoachVM coach)
        {
            bool isCoachSuccessful = false;
            bool isScheduleSuccessful = false;
            var _coach = _context.Coaches.FirstOrDefault(x => x.Id == id);

            if (_coach != null)
            {
                _coach.Name = coach.Name;
                _coach.Title = coach.Title;
                _coach.Active = coach.Active;
                _coach.UpdatedDate = DateTime.Now;

                _context.SaveChanges();
                isCoachSuccessful = true;

                if (coach.Schedules != null)
                {
                    foreach (CoachScheduleVM sched in coach.Schedules)
                    {
                        if (sched.CoachId < 1)
                        {
                            var _coachSchedule = new CoachSchedule()
                            {
                                CoachId = _coach.Id,
                                StartTime = sched.StartAvailabilityDate.ToString(),
                                EndTime = sched.EndAvailabilityDate.ToString(),
                                Active = 1,
                                CreatedDate = DateTime.Now
                            };

                            _context.CoachSchedules.Add(_coachSchedule);
                            _context.SaveChanges();
                            isScheduleSuccessful = true;
                        }
                    }
                }
            }

            return (isCoachSuccessful && isScheduleSuccessful)?true:false;
        }

        public bool DeleteById(int id)
        {
            bool isSuccessful = false;
            var _coach = _context.Coaches.FirstOrDefault(x => x.Id == id);

            if (_coach != null)
            {
                _context.Remove(_coach);
                _context.SaveChanges();
                isSuccessful = true;
            }

            return isSuccessful;
        }
    }
}
