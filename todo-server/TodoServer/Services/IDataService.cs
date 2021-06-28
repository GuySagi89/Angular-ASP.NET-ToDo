using System.Collections.Generic;
using System.Threading.Tasks;
using TodoServer.Models;

namespace TodoServer.Services
{
    public interface IDataService
    {
        public Task<IEnumerable<TodoItem>> GetAllItems();
        public Task<IEnumerable<TodoList>> GetAllLists();
        public Task UpdateListsDB(List<TodoList> items);
        public Task UpdateItemsDB(List<TodoItem> lists);
    }
}
