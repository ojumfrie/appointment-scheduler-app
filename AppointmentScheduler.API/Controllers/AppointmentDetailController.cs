using AppointmentScheduler.API.Data;
using AppointmentScheduler.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduler.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentDetailController : ControllerBase
    {
        private readonly AppointmentSchedulerContext _context;
        public AppointmentDetailController(AppointmentSchedulerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<AppointmentDetail>> Get()
        {
            return await _context.AppointmentDetails.ToListAsync();
        }

        [HttpGet("id")]
        [ProducesResponseType(typeof(AppointmentDetail), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var AppointmentDetail = await _context.AppointmentDetails.FindAsync(id);
            return AppointmentDetail == null ? NotFound() : Ok(AppointmentDetail);
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost]
        public async Task<IActionResult> Create(AppointmentDetail AppointmentDetail)
        {
            await _context.AppointmentDetails.AddAsync(AppointmentDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = AppointmentDetail.Id }, AppointmentDetail);
        }

        [HttpPut("{id}")] // this way, because we expect the id is passed in the URL.
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, AppointmentDetail AppointmentDetail)
        {
            if (id != AppointmentDetail.Id) return BadRequest();

            _context.Entry(AppointmentDetail).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")] // this way, because we expect the id is passed in the URL.
        [ProducesResponseType(StatusCodes.Status204NoContent)] // here, we specify that the endpoint can return 204
        [ProducesResponseType(StatusCodes.Status404NotFound)] // here, we specify that the endpoint can return 404
        public async Task<IActionResult> Delete(int id)
        {
            var AppointmentDetailToDelete = await _context.AppointmentDetails.FindAsync(id);
            if (AppointmentDetailToDelete == null) return NotFound();

            _context.AppointmentDetails.Remove(AppointmentDetailToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
