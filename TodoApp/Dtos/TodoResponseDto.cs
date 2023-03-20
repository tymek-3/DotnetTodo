using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Models;

namespace TodoApp.Dtos
{
    public class TodoResponseDto
    {

        public Guid Id { get; set; }
        public UserResponseDto User { get; set; } = null!;
        public string Title { get; set; } = null!;
        public bool IsCompleted { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}