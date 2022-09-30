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
    public class CoachController : ControllerBase
    {
        private CoachesService _service;

        public CoachController(CoachesService service)
        {
            _service = service;
        }

        [HttpGet("coaches")]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllCoachesAndSchedules());
        }

        [HttpGet("coaches-schedules")]
        public IActionResult GetAllCoachesAndSchedules()
        {
            return Ok(_service.GetAllCoachesAndSchedulesV2());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_service.GetById(id));
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]CoachVM coach)
        {
            _service.Add(coach);
            return Ok();
        }

        [HttpPut("edit/{id}")]
        public IActionResult Update(int id, [FromBody]CoachVM coach)
        {
            var isUpdated = _service.UpdateById(id, coach);
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
