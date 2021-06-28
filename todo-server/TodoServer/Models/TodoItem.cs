namespace TodoServer.Models
{
    public record TodoItem(
        int Id,
        string Caption,
        int ListId,
        bool IsCompleted);
}
