using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Dtos;
using TodoApp.Models;

namespace TodoApp.Services.TodoService
{
    public class TodoService : ITodoService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TodoService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<Todo?> CreateTodo(CreateTodoDto request)
        {
            var userId = GetUserId();
            if (!await _context.Users.AnyAsync(u => u.Id == userId)) return null;
            var todo = new Todo()
            {
                Title = request.Title,
                UserId = userId
            };
            await _context.Todos.AddAsync(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<bool> DeleteTodo(Guid id)
        {
            var userId = GetUserId();
            if (!await _context.Users.AnyAsync(u => u.Id == userId)) return false;
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (todo is not Todo) return false;
            _context.Remove(todo);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Todo?> GetTodo(Guid id)
        {
            var userId = GetUserId();
            return await _context.Todos.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        }

        public async Task<List<Todo>?> GetTodos()
        {
            var userId = GetUserId();
            return await _context.Todos.Where(t => t.UserId == userId).ToListAsync();
        }

        public async Task<Todo?> ToggleComplete(Guid id)
        {
            var userId = GetUserId();
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (todo is not Todo) return null;
            todo.IsCompleted = (bool)!todo.IsCompleted;
            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<Todo?> UpdateTodo(UpdateTodoDto request, Guid id)
        {
            var userId = GetUserId();
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (todo == null) return null;
            todo.Title = request.Title == null ? todo.Title : request.Title;
            todo.IsCompleted = request.IsCompleted == null ? todo.IsCompleted : (bool)request.IsCompleted;
            _context.Update(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        private Guid GetUserId()
        {
            if (_httpContextAccessor.HttpContext == null) return Guid.Empty;
            return Guid.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        }
    }
}