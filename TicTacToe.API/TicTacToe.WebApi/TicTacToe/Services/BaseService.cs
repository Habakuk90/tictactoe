using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class BaseService : IBaseService
    {
        private readonly AppDbContext context;

        public BaseService(AppDbContext context)
        {
            this.context = context;
        }

        public virtual GameUserModel GetUserByConnection(string connectionId)
        {
            throw new NotImplementedException();
        }

        public virtual Task JoinGroupAsync(GameUserModel userModel, string groupName)
        {
            throw new NotImplementedException();
        }

        public virtual Task LeaveGroupAsync(GameUserModel userModel, string groupName)
        {
            throw new NotImplementedException();
        }

        public virtual void RemoveUser(GameUserModel user, string currentConnectionId)
        {
            throw new NotImplementedException();
        }

        public virtual void UpdateUserList()
        {
            throw new NotImplementedException();
        }
    }
}
