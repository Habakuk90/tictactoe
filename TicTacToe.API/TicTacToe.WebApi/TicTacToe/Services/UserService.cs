using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class UserService : BaseService<GameHub, IGameHub>, IUserService
    {
        #region private properties

        private AppDbContext _context;
        // check if still works when there are multiple hubs.
        private IHubContext<GameHub, IGameHub> _gameHub;

        #endregion

        public UserService(
            AppDbContext context,
            IHubContext<GameHub, IGameHub> gameHub)
            : base(context, gameHub)
        {
            this._context = context;
            this._gameHub = gameHub;
        }
    }
}
