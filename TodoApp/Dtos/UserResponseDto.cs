using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Models;

namespace TodoApp.Dtos
{
    public class UserResponseDto
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string Username { get; set; } = null!;
        public List<TodoResponseDto> Todos { get; set; } = new List<TodoResponseDto>();
    }
}