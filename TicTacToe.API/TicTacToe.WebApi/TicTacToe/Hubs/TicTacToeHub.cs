using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    /// <summary>
    /// Represents a SignalR Hub with the <see cref="ITicTacToeHub"/> Methods.
    /// </summary>
    public class TicTacToeHub : BaseHub<ITicTacToeHub>
    {
        private readonly IUserService _userService;

        /// <summary>
        /// Hub ctor.
        /// </summary>
        /// <param name="baseService"></param>
        public TicTacToeHub(IUserService baseService) : base(baseService)
        {
            this._userService = baseService;
        }

        /// <summary>
        /// Client Method where a TicTacToe tile got clicked.
        /// </summary>
        /// <param name="groupName">
        /// Name of group given by client.
        /// </param>
        /// <param name="tileId">
        /// Id of the Tile which got clicked on TicTacToe.
        /// </param>
        public async void TileClicked(string groupName, string tileId)
        {
            await Clients.Group(groupName).SwitchTurn();
            await Clients.Group(groupName).TileChange(tileId);
            
        }

        /// <summary>
        /// Client Method when the game is over.
        /// </summary>
        /// <param name="groupName">
        /// Name of the group given by front end.
        /// </param>
        /// <param name="winningTileId">
        /// The winning Tile id of tictactoe game.
        /// </param>
        /// <param name="winningLine">
        /// the winning Line to be updated for all player in Group.
        /// </param>
        public async void GameOver(
            string groupName,
            string winningTileId, 
            string winningLine)
        {
            await Clients.Group(groupName).GameOver(winningTileId, winningLine);
        }
    }
}
