using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    public class TicTacToeHub : Hub<ITicTacToeHub>
    {

        public TicTacToeHub()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="room">id:number, name:string, List<GameUserModel></param>
        public async void TileClickedAsync(string room, string tileId)
        {
            await Clients.Group(room).SwitchTurn();
            await Clients.Group(room).TileChange(tileId);
        }

        /// <summary>
        /// Send GameOver to specific Group
        /// </summary>
        /// <param name="groupName">Group Name given by the frontend</param>
        public async void GameOverAsync(string groupName, string winningTileId, string winningLine)
        {
            await Clients.Group(groupName).GameOver(winningTileId, winningLine);
        }
    }
}
