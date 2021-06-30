using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoServer.Models;

namespace TodoServer.Services
{
    public class RepositoryService : IRepositoryService
    {
        private IDataService _data;

        public RepositoryService(IDataService data)
        {
            _data = data;
        }

        public async Task<List<TodoList>> GetAllLists()
        {
            var list = await _data.GetAllLists();
            return list.ToList();
        }

        public async Task<List<TodoItem>> GetAllItems(bool activeItems)
        {
            var list = await _data.GetAllItems();

            if (activeItems)
            {
                return list.Where(i => !i.IsCompleted).ToList();
            }
            return list.ToList();
        }
        public async Task<TodoItem> GetItemById(string id)
        {
            var todoItems = await _data.GetAllItems();
            return todoItems.FirstOrDefault(i => i.Id == int.Parse(id));
        }

        public async Task<TodoList> GetListById(string id)
        {
            var todoLists = await _data.GetAllLists();
            return todoLists.FirstOrDefault(l => l.Id == int.Parse(id));
        }

        public async Task<TodoItem> AddNewItem(TodoItem item)
        {
            var todoItems = await _data.GetAllItems();

            var maxId = 0;

            if (todoItems.Any())
            {
                maxId = todoItems.Max(i => i.Id);
            }

            var actualItem = item with
            {
                Id = maxId + 1
            };

            var updatedTodoItems = todoItems.ToList();
            updatedTodoItems.Add(actualItem);

            await _data.UpdateItemsDB(updatedTodoItems);
            return actualItem;
        }

        public async Task<TodoList> AddNewList(TodoList list)
        {
            var todoLists = await _data.GetAllLists();
            var maxId = 0;

            if (todoLists.Any())
            {
                maxId = todoLists.Max(l => l.Id);
            }

            var actualList = list with
            {
                Id = maxId + 1
            };

            var updatedTodoLists = todoLists.ToList();
            updatedTodoLists.Add(actualList);

            await _data.UpdateListsDB(updatedTodoLists);

            return actualList;
        }

        public async Task DeleteItem(string itemId)
        {
            var todoItems = await _data.GetAllItems();
            var updatedItems = todoItems.Where(i => i.Id != int.Parse(itemId)).ToList();
            await _data.UpdateItemsDB(updatedItems);
        }

        public async Task DeleteList(string listId)
        {
            var todoLists = await _data.GetAllLists();
            var updatedTodoLists = todoLists.Where(l => l.Id != int.Parse(listId)).ToList();

            var itemsList = await _data.GetAllItems();
            var updatedItemsList = itemsList.Where(i => i.ListId != int.Parse(listId)).ToList();

            await _data.UpdateListsDB(updatedTodoLists);
            await _data.UpdateItemsDB(updatedItemsList);

        }

        public async Task ToggleItemStatus(string itemId)
        {
            var itemsList = await _data.GetAllItems();
            var updatedItems = itemsList.
                Select(i =>
                {
                    if (i.Id == int.Parse(itemId))
                    {
                        var changedItem = i with { IsCompleted = !i.IsCompleted };
                        return changedItem;
                    }
                    else return i;
                }
                )
                ;
            await _data.UpdateItemsDB(updatedItems.ToList());
        }

        public async Task EditList(TodoList list)
        {
            var todoLists = await _data.GetAllLists();
            var updatedTodoLists = todoLists.
                Select(l =>
                {
                    if (l.Id == list.Id)
                    {
                        return list;
                    }
                    else return l;
                }
                )
                ;
            await _data.UpdateListsDB(updatedTodoLists.ToList());
        }

        public async Task<List<TodoItem>> GetListTodoItems(string listId, bool activeItems)
        {
            var list = await _data.GetAllItems();
            if (activeItems)
            {
                return list.
                    Where(i => (i.ListId == int.Parse(listId)) && (i.IsCompleted))
                    .ToList();
            }
            return list.Where(l => l.ListId == int.Parse(listId)).ToList();
        }
    }
}
