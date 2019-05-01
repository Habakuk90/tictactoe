﻿using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class GroupService: BaseService, IGroupService
    {
        private AppDbContext _context;

        private IHubContext<GameHub> _gameHub;

        public GroupService(AppDbContext context, IHubContext<GameHub> gameHub)
            : base(context)
        {
            this._context = context;
            this._gameHub = gameHub;
        }

        public override async Task JoinGroupAsync(GameUserModel user, string groupName)
        {
            user.GroupName = groupName;
            await _gameHub.Groups
                .AddToGroupAsync(user.CurrentConnectionId, groupName);

            _context.SaveChanges();
        }

        public override async Task LeaveGroupAsync(GameUserModel user, string groupName = "")
        {
            user.GroupName = groupName;
            if (!string.IsNullOrWhiteSpace(user.GroupName))
            {
                await _gameHub.Groups
                .RemoveFromGroupAsync(user.CurrentConnectionId, groupName);

                user.GroupName = string.Empty;
            }

            _context.Attach(user);
            _context.SaveChanges();
        }
    }
}
