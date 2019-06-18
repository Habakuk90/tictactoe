using System;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Manager;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    /// <summary>
    /// Represents a SignalR Hub with the <see cref="ITicTacToeClient"/> Methods.
    /// </summary>
    public class TicTacToeHub : AppHub<ITicTacToeClient>
    {
        private readonly IHubManager<TicTacToeHub, ITicTacToeClient> _manager;
        /// <summary>
        /// Hub ctor.
        /// </summary>
        /// <param name="userService"></param>
        public TicTacToeHub(HubManagerFactory<TicTacToeHub, ITicTacToeClient> factory)
        {
            this._manager = factory.Create();
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
        public async Task TileClicked(string groupName, string tileId)
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
        public async Task GameOver(
            string groupName,
            string winningTileId,
            string winningLine)
        {
            await Clients.Group(groupName).GameOver(winningTileId, winningLine);
        }

        #region public override


        /// <summary>
        /// Adds the currently connected User into database
        /// </summary>
        /// <param name="userName">
        /// Name of the connected User.
        /// </param>
        /// <param name="isAnonymous">
        /// flag if the connected user is anonymous.
        /// </param>
        /// <returns>
        /// <see cref="Task"/>
        /// </returns>
        public override async Task AddCurrentUser(string userName, bool isAnonymous = true)
        {
            var currentUser = new User
            {
                Name = userName,
                CurrentConnectionId = Context.ConnectionId,
                IsAnonymous = isAnonymous,
                Status = Constants.Status.INGAME
            };

            await this._manager.UpdateUser(currentUser);
        }

        /// <summary>
        /// Adds current user to a Group with given group name.
        /// </summary>
        /// <param name="groupName">
        /// Name of group which should be joined.
        /// </param>
        /// <returns></returns>
        public override async Task<string> JoinGroup(string groupName)
        {
            var user = await _manager.GetUser(connectionId: Context.ConnectionId);
            await this._manager.JoinGroup(user, groupName);

            return groupName;
        }

        /// <summary>
        /// Removes the current user from a Group with given groupName.
        /// </summary>
        /// <param name="groupName">
        /// Name of group which should be left.
        /// </param>
        /// <returns></returns>
        public override async Task<string> LeaveGroup(string groupName)
        {
            var user = await this._manager.GetUser(connectionId: Context.ConnectionId);
            await this._manager.LeaveGroup(user, groupName);

            return groupName;
        }

        /// <summary>
        /// Defines what happens when frontend user disconnects
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override async Task OnDisconnectedAsync(Exception e)
        {
            await this._manager.RemoveUser(Context.ConnectionId);
            await base.OnDisconnectedAsync(e);
        }

        #endregion
    }
}
