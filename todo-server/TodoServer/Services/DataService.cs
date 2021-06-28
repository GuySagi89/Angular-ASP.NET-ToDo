using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using TodoServer.Models;

namespace TodoServer.Services
{
    public class DataService : IDataService
    {
        private const string _basePath = "Data";
        private static string _itemsPath = "Items.json";
        private static string _listsPath = "Lists.json";

        private static string _itemsCombinedPath = $"{_basePath}/{_itemsPath}";
        private static string _listsCombinedPath = $"{_basePath}/{_listsPath}";

        public async Task<IEnumerable<TodoList>> GetAllLists()
        {
            var jsonData = await File.ReadAllTextAsync(_listsCombinedPath);
            return JsonConvert.DeserializeObject<IEnumerable<TodoList>>(jsonData);
        }

        public async Task<IEnumerable<TodoItem>> GetAllItems()
        {
            var jsonData = await File.ReadAllTextAsync(_itemsCombinedPath);
            return JsonConvert.DeserializeObject<IEnumerable<TodoItem>>(jsonData);
        }

        public async Task UpdateListsDB(List<TodoList> listsChanges)
        {
            var changesSerialized = JsonConvert.SerializeObject(listsChanges, Formatting.Indented);
            File.WriteAllText(_listsCombinedPath, changesSerialized);
            await Task.CompletedTask;
        }

        public async Task UpdateItemsDB(List<TodoItem> itemsChanges)
        {
            var changesSerialized = JsonConvert.SerializeObject(itemsChanges, Formatting.Indented);
            File.WriteAllText(_itemsCombinedPath, changesSerialized);
            await Task.CompletedTask;
        }
    }
}
