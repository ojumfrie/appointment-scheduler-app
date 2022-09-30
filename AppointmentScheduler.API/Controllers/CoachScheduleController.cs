using AppointmentScheduler.API.Data;
using AppointmentScheduler.API.Data.Services;
using AppointmentScheduler.API.Data.ViewModels;
using AppointmentScheduler.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduler.API.Controllers
{
    [Route("api/schedule")]
    [ApiController]
    public class CoachScheduleController : ControllerBase
    {
        private CoachSchedulesService _service;

        public CoachScheduleController(CoachSchedulesService service)
        {
            _service = service;
        }

        [HttpGet("schedules")]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("schedules-coaches")]
        public IActionResult GetAllWithCoach()
        {
            return Ok(_service.GetAllWithCoach());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_service.GetById(id));
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]CoachScheduleVM coachSchedule)
        {
            _service.Add(coachSchedule);
            return Ok();
        }

        [HttpPut("edit/{id}")]
        public IActionResult Update(int id, [FromBody] CoachScheduleVM coachSchedule)
        {
            var isUpdated = _service.UpdateById(id, coachSchedule);
            if (isUpdated) return Ok();
            else return NotFound();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var isUpdated = _service.DeleteById(id);
            if (isUpdated) return Ok();
            else return BadRequest();
        }

        [HttpGet("coaches")]
        public IActionResult GetAllCoaches()
        {
            return Ok(_service.GetAllCoaches());
        }
    }
}
