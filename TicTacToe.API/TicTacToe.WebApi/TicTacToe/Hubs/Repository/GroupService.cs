using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    public class GroupService : IGroupService
    {
        private AppDbContext _context;

        public GroupService(AppDbContext context)
        {
            _context = context;
        }

        public void JoinGroup(GameUserModel userModel, string groupName)
        {
            //var currentUser = _context.AppUser.Where(x => x.ConnectionIds.Contains(userModel.CurrentConnectionId)).First();
            userModel.GroupName = groupName;
            _context.SaveChanges();
        }

        public void LeaveGroup(GameUserModel userModel, string groupName)
        {
            if (!string.IsNullOrWhiteSpace(userModel.GroupName))
            {
                userModel.GroupName = string.Empty;
            }
            _context.SaveChanges();
        }
    }
}
