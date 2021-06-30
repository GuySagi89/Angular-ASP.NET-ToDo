using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoServer.Models;
using TodoServer.Services;

namespace TodoServer.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private IRepositoryService _repo;

        public ItemsController(IRepositoryService repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<TodoItem>>> GetAllItems([FromQuery] bool activeItems)
        {
            try
            {
                var allItems = await _repo.GetAllItems(activeItems);
                return Ok(allItems);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddItem([FromBody] TodoItem item)
        {
            try
            {
                await _repo.AddNewItem(item);
                return Ok();
            }
            catch
            {
                return UnprocessableEntity();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetItemById(string id)
        {
            try
            {
                var item = await _repo.GetItemById(id);
                return Ok(item);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditItem([FromBody] TodoItem item)
        {
            try
            {
                await _repo.EditItem(item);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItemById(string id)
        {
            try
            {
                await _repo.DeleteItem(id);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }

    }
}
