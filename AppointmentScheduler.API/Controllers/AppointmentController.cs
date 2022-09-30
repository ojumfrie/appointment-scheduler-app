using AppointmentScheduler.API.Data;
using AppointmentScheduler.API.Data.Services;
using AppointmentScheduler.API.Data.ViewModels;
using AppointmentScheduler.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduler.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private AppointmentsService _service;

        public AppointmentController(AppointmentsService service)
        {
            _service = service;
        }

        [HttpGet("appointments")]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("appointments-schedules")]
        public IActionResult GetAllWithDetails()
        {
            return Ok(_service.GetAllWithDetails());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_service.GetById(id));
        }

        [HttpGet("coaches-schedules/{id}")]
        public IActionResult GetByIdWithCoachesAndSchedules(int id)
        {
            return Ok(_service.GetByIdWithCoachesAndSchedules(id));
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]AppointmentVM appointment)
        {
            // var isAdded = _service.Add(appointment);
            // if (isAdded) return Ok();
            // else return BadRequest();

            _service.Add(appointment);
            return Ok();
        }

        [HttpPut("edit/{id}")]
        public IActionResult Update(int id, [FromBody]AppointmentVM appointment)
        {
            var isUpdated = _service.UpdateById(id, appointment);
            if (isUpdated) return Ok();
            else return BadRequest();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var isUpdated = _service.DeleteById(id);
            if (isUpdated) return Ok();
            else return BadRequest();
        }
    }
}
