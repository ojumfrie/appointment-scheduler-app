using AppointmentScheduler.API.Data.ViewModels;
using AppointmentScheduler.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AppointmentScheduler.API.Data.Services
{
    public class CoachSchedulesService
    {
        private AppointmentSchedulerContext _context;

        public CoachSchedulesService(AppointmentSchedulerContext context)
        {
            _context = context;
        }

        public dynamic GetAll()
        {
            var coachesAndSchedules = _context.CoachSchedules
                    .FromSqlRaw("SELECT cs.Id, cs.CoachId, c.Name, cs.StartAvailabilityDate, cs.EndAvailabilityDate, cs.Active, cs.CreatedDate " +
                                "FROM Coaches c " +
                                    "LEFT OUTER JOIN CoachSchedules cs ON c.Id = cs.CoachId " +
                                "WHERE c.Active = 1 AND cs.Active = 1 ")
                    .ToList();

            return coachesAndSchedules;
        }

        public List<object> GetAllWithCoach()
        {
            List<object> list = new List<object>();

            var coachSchedules = _context.CoachSchedules
                    .FromSqlRaw("SELECT cs.* " +
                                "FROM CoachSchedules cs " +
                                    "LEFT OUTER JOIN Coaches c ON cs.CoachId = c.Id " +
                                "WHERE cs.Active = 1 AND c.Active = 1")
                    .ToList();
            list.Add(coachSchedules);

            var coaches = _context.Coaches
                    .FromSqlRaw("SELECT c.* " +
                                "FROM Coaches c " +
                                    "LEFT OUTER JOIN CoachSchedules cs ON c.Id = cs.CoachId " +
                                "WHERE cs.Active = 1 AND c.Active = 1")
                    .ToList();
            list.Add(coaches);

            return list;
        }

        public dynamic GetById(int id)
        {
            var coachSchedulesAndCoaches = _context.CoachSchedules
                    .FromSqlRaw("SELECT cs.* " +
                                "FROM CoachSchedules cs " +
                                    "LEFT OUTER JOIN Coaches c ON cs.CoachId = c.Id " +
                                "WHERE cs.Active = 1 AND c.Active = 1 AND cs.Id = " + id)
                    .ToList();

            return coachSchedulesAndCoaches;
        }

        public void Add(CoachScheduleVM coachSchedule)
        {
            var _coachSchedule = new CoachSchedule()
            {
                CoachId = coachSchedule.CoachId,
                StartTime = coachSchedule.StartAvailabilityDate.ToString(),
                EndTime = coachSchedule.EndAvailabilityDate.ToString(),
                Active = coachSchedule.Active,
                CreatedDate = DateTime.Now,
            };

            _context.CoachSchedules.Add(_coachSchedule);
            _context.SaveChanges();
        }

        public bool UpdateById(int id, CoachScheduleVM coachSchedule)
        {
            bool isSuccessful = false;
            var _coachSchedule = _context.CoachSchedules.FirstOrDefault(x => x.Id == id);

            if (_coachSchedule != null)
            {
                _coachSchedule.Active = 0;
                _context.SaveChanges();
                isSuccessful = true;
            }

            return isSuccessful;
        }

        public bool DeleteById(int id)
        {
            bool isSuccessful = false;
            var _coachSchedule = _context.CoachSchedules.FirstOrDefault(x => x.Id == id);

            if (_coachSchedule != null)
            {
                _context.Remove(_coachSchedule);
                _context.SaveChanges();
                isSuccessful = true;
            }

            return isSuccessful;
        }

        public List<Coach> GetAllCoaches()
        {
            var query = _context.Coaches
                                .Where(x => x.Active == 1)
                                .ToList<Coach>();

            return query;
        }
    }
}
