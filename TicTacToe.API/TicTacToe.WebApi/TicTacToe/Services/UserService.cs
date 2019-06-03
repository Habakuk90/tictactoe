using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class UserService : BaseService<HomeHub, IHomeHub>, IUserService
    {
        #region private properties
        
        private AppDbContext _context;
        private IHubContext<HomeHub, IHomeHub> _gameHub;

        #endregion

        public UserService(
            AppDbContext context,
            IHubContext<HomeHub, IHomeHub> gameHub)
            : base(context, gameHub)
        {
            this._context = context;
            this._gameHub = gameHub;
        }
    }
}
