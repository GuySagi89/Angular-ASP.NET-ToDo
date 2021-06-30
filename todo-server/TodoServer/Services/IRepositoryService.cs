using System.Collections.Generic;
using System.Threading.Tasks;
using TodoServer.Models;

namespace TodoServer.Services
{
    public interface IRepositoryService
    {
        Task<TodoItem> AddNewItem(TodoItem item);
        Task<TodoList> AddNewList(TodoList list);
        Task DeleteItem(string itemId);
        Task DeleteList(string listId);
        Task EditList(TodoList list);
        Task<List<TodoItem>> GetAllItems(bool activeItems);
        Task<List<TodoList>> GetAllLists();
        Task<TodoItem> GetItemById(string id);
        Task<TodoList> GetListById(string id);
        Task<List<TodoItem>> GetListTodoItems(string listId,bool activeItems);
        Task ToggleItemStatus(string itemId);
    }
}