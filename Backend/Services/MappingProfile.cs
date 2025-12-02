using AutoMapper;
using LeaveManagementAPI.DTOs.LeaveRequests;
using LeaveManagementAPI.Models;

namespace LeaveManagementAPI
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Create mapping for LeaveRequest -> LeaveRequestDto
            CreateMap<LeaveRequest, LeaveRequestDto>()
                .ForMember(dest => dest.UserName,
                           opt => opt.MapFrom(src => src.User.FullName)) // Employee name
                .ForMember(dest => dest.LeaveType,
                           opt => opt.MapFrom(src => src.LeaveType.Name))
                .ForMember(dest => dest.ApproverName,
                           opt => opt.MapFrom(src => src.Approver != null ? src.Approver.FullName : null))
                .ForMember(dest => dest.Status,
                           opt => opt.MapFrom(src => src.Status.ToString()));

            // Create mapping for DTO -> Entity
            CreateMap<CreateLeaveRequestDto, LeaveRequest>();
        }
    }
}
