using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Dtos
{
    public class UpdateTodoDto
    {
        public string? Title { get; set; }
        public bool? IsCompleted { get; set; }
    }
}