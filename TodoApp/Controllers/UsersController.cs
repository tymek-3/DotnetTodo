using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Dtos;
using TodoApp.Models;
using TodoApp.Services.UsersService;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserLoginDto request, [FromQuery] bool login)
        {
            if (await _userService.IsUsernameTaken(request.Username)) return BadRequest("Username taken");
            var user = await _userService.RegisterUser(request);
            if (login)
            {
                return Ok(await _userService.LoginUser(request));
            }
            var userMap = _mapper.Map<User, UserResponseDto>(user);
            return Ok(userMap);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto request)
        {

            if (!await _userService.IsUsernameTaken(request.Username)) return BadRequest("Credentials Incorrect");
            string? token = await _userService.LoginUser(request);
            if (token == null) return BadRequest("Credentials Incorrect");
            return Ok(token);
        }

        [HttpGet("me"), Authorize]
        public async Task<IActionResult> GetMe()
        {
            var user = await _userService.GetMe();
            if (user == null) return BadRequest();
            var userMap = _mapper.Map<User, UserResponseDto>(user);
            return Ok(userMap);
        }
    }
}