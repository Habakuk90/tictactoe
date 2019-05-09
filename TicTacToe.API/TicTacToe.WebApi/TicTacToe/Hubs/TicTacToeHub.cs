using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Services;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    public class TicTacToeHub : BaseHub<ITicTacToeHub>
    {
        private readonly IGameService _gameService;

        public TicTacToeHub(IGameService baseService) : base(baseService)
        {
            this._gameService = baseService;
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
