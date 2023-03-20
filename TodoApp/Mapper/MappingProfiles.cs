using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using TodoApp.Dtos;
using TodoApp.Models;

namespace TodoApp.Mapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Todo, TodoResponseDto>().ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User));
            CreateMap<UpdateTodoDto, Todo>();
            CreateMap<User, UserResponseDto>();
        }
    }
}