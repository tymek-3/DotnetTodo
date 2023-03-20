using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Dtos;
using TodoApp.Models;

namespace TodoApp.Services.TodoService
{
    public interface ITodoService
    {
        Task<List<Todo>?> GetTodos();
        Task<Todo?> GetTodo(Guid id);
        Task<Todo?> CreateTodo(CreateTodoDto request);
        Task<Todo?> ToggleComplete(Guid id);
        Task<Todo?> UpdateTodo(UpdateTodoDto request, Guid id);
        Task<bool> DeleteTodo(Guid id);
    }
}