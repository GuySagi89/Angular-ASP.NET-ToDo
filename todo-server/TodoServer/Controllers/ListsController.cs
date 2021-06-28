using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoServer.Models;
using TodoServer.Services;

namespace TodoServer.Controllers
{
    [Route("api/lists")]
    [ApiController]


    public class ListsController : ControllerBase
    {
        private IRepositoryService _repo;
        public ListsController(IRepositoryService repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<TodoList>>> GetAllLists()
        {
            try
            {
                var allLists = await _repo.GetAllLists();
                return Ok(allLists);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetListById(string id)
        {
            try
            {
                var todoList = await _repo.GetListById(id);
                return Ok(todoList);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddList([FromBody] TodoList list)
        {
            try
            {
                await _repo.AddNewList(list);
                return Ok();
            }
            catch
            {
                return UnprocessableEntity();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteListById(string id)
        {
            try
            {
                await _repo.DeleteList(id);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("{id}/items")]
        public async Task<ActionResult<List<TodoItem>>> GetAllItemsByListId(string id)
        {
            try
            {
                var list = await _repo.GetListTodoItems(id);
                return Ok(list);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut]
        public async Task<ActionResult> EditList([FromBody] TodoList list)
        {
            try
            {
                await _repo.EditList(list);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
