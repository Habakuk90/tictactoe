using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.User;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class GameService
    {
        public IHubContext<GameHub> _gameHub;
        public UserHandler _userHandler;


        public GameService(IHubContext<GameHub> gameHub)
        {
            this._gameHub = gameHub;
            this._userHandler = new UserHandler(gameHub);
        }

        public async Task SendMessage()
        {
            await _gameHub.Clients.All.SendAsync("hallo", "waaaaaaaaat");
        }

        public string SendMessage2()
        {
            return "AHHHHHHHH";
        }
    }
}
