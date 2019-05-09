using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class GameService : BaseService<TicTacToeHub, ITicTacToeHub>, IGameService
    {
        public IHubContext<TicTacToeHub, ITicTacToeHub> _gameHub;
        private readonly AppDbContext _context;

        public GameService(AppDbContext context,
            IHubContext<TicTacToeHub, ITicTacToeHub> gameHub)
            : base(context, gameHub)
        {
            this._context = context;
            this._gameHub = gameHub;
        }
    }
}
