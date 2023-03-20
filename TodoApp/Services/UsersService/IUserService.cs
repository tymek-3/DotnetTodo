using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Dtos;
using TodoApp.Models;

namespace TodoApp.Services.UsersService
{
    public interface IUserService
    {
        Task<bool> IsUsernameTaken(string username);
        Task<User> RegisterUser(UserLoginDto request);
        Task<string?> LoginUser(UserLoginDto request);
        Task<User?> GetMe();
    }
}