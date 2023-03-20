using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Dtos;
using TodoApp.Models;
using TodoApp.Services.TodoService;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TodosController : ControllerBase
    {
        private readonly ITodoService _todoService;
        private readonly IMapper _mapper;
        public TodosController(ITodoService todoService, IMapper mapper)
        {
            _todoService = todoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetTodos()
        {
            var todos = await _todoService.GetTodos();
            if (todos is not List<Todo>) return BadRequest();
            var todosMap = _mapper.Map<List<Todo>, List<TodoResponseDto>>(todos);
            return Ok(todosMap);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetTodo([FromRoute] Guid id)
        {
            var todo = await _todoService.GetTodo(id);
            if (todo is not Todo) return NotFound("Todo with that id does not exists");
            var todoMap = _mapper.Map<Todo, TodoResponseDto>(todo);
            return Ok(todoMap);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTodo([FromBody] CreateTodoDto request)
        {
            if (request.Title == string.Empty) return BadRequest("Title is an empty string");
            var todo = await _todoService.CreateTodo(request);
            if (todo is not Todo) return BadRequest("idk ur fault");
            var todoMap = _mapper.Map<Todo, TodoResponseDto>(todo);
            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todoMap);
        }

        [HttpPatch("{id:guid}/toggle-complete")]
        public async Task<IActionResult> ToggleComplete([FromRoute] Guid id)
        {
            var todo = await _todoService.ToggleComplete(id);
            if (todo is not Todo) return NotFound("Todo with that id does not exists");

            var todoMap = _mapper.Map<Todo, TodoResponseDto>(todo);
            return Ok(todoMap);
        }

        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> UpdateTodo([FromBody] UpdateTodoDto request, [FromRoute] Guid id)
        {
            var todo = await _todoService.UpdateTodo(request, id);
            if (todo is not Todo) return BadRequest("Something went wrong");
            var todoMap = _mapper.Map<Todo, TodoResponseDto>(todo);
            return Ok(todoMap);
        }
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] Guid id)
        {
            var success = await _todoService.DeleteTodo(id);
            if (!success) return BadRequest("Something went wrong");
            return NoContent();
        }
    }
}