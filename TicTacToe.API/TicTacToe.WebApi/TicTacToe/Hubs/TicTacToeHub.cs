using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    public class TicTacToeHub : BaseHub<ITicTacToeHub>
    {

        public TicTacToeHub(IUserService userService,
            IGroupService groupService) : base(userService, groupService)
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="room">id:number, name:string, List<GameUserModel></param>
        public async void TileClicked(string room, string tileId)
        {
            await Clients.Group(room).SwitchTurn();
            await Clients.Group(room).TileChange(tileId);
        }

        /// <summary>
        /// Send GameOver to specific Group
        /// </summary>
        /// <param name="groupName">Group Name given by the frontend</param>
        public async void GameOver(
            string groupName,
            string winningTileId, 
            string winningLine)
        {
            await Clients.Group(groupName).GameOver(winningTileId, winningLine);
        }
    }
}
