using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs;

namespace TicTacToe.WebApi.TicTacToe.User
{
    public class UserHandler
    {
        private IHubContext<GameHub> _gameHub;

        public UserHandler(IHubContext<GameHub> gameHub)
        {
            this._gameHub = gameHub;
        }

        public async Task JoinGroup(string groupName)
        {

        }
    }
}
