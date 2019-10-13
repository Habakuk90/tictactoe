

namespace GameHub
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;
    using TicTacToe.WebApi.TicTacToe.Hubs;

    public class GameHub : AppHub<ITicTacToeClient>
    {
        public ITicTacToeClient GameClient { get; private set; }


        public GameHub()
        {
           
        }

        public string Hello(string message)
        {
            return message;
        }

        public override Task AddCurrentUser(string userName, bool isAnonymous = true)
        {
            throw new System.NotImplementedException();
        }

        public override Task<string> JoinGroup(string groupName)
        {
            throw new System.NotImplementedException();
        }

        public override Task<string> LeaveGroup(string groupName)
        {
            throw new System.NotImplementedException();
        }
    }
    public interface ITicTacToeClient : IAppClient
    {
        Task Hello(string message);
        //Task SwitchTurn();

        //Task TileChange(string tileId);

        //Task GameOver(string winningTileId, string winningLine);
    }
}
