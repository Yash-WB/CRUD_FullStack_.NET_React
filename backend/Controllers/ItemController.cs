using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly MyAppContext _context;
        private readonly ILogger<ItemController> _logger;

        public ItemController(MyAppContext context, ILogger<ItemController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/item
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        // GET: api/item/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST: api/item
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid model state for item: {@Item}", item);
                return BadRequest(ModelState);
            }

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
        }

        // PUT: api/item/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            if (id != item.Id)
            {
                _logger.LogError("Item ID mismatch: id={Id}, item.Id={ItemId}", id, item.Id);
                return BadRequest(new { message = "ID mismatch" });
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, "Concurrency error while updating item: {@Item}", item);
                    throw;
                }
            }

            return NoContent();
        }


        // DELETE: api/item/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}
 
