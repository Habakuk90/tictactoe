using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.User;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class GameService : BaseService
    {
        public IHubContext<GameHub> _gameHub;
        public UserHandler _userHandler;

        public GameService(AppDbContext context, IHubContext<GameHub> gameHub)
            : base(context)
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
