using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Dtos
{
    public class UserLoginDto
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}