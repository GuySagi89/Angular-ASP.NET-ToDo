namespace TodoServer.Models
{
    public record TodoList
    (
      int Id,
      string Caption,
      string Description,
      string Icon,
      string Color);
}
