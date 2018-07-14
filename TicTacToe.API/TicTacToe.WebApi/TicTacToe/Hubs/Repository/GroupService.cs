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

        public void JoinGroup(GameUserModel userModel)
        {

        }

        public void LeaveGroup(GameUserModel userModel)
        {

        }
    }
}
