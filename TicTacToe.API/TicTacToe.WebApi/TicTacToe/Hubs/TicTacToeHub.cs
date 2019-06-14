using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Manager;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    /// <summary>
    /// Represents a SignalR Hub with the <see cref="ITicTacToeHub"/> Methods.
    /// </summary>
    public class TicTacToeHub : AppHub<ITicTacToeHub>
    {
        private readonly IHubManager<TicTacToeHub, ITicTacToeHub> _manager;
        /// <summary>
        /// Hub ctor.
        /// </summary>
        /// <param name="userService"></param>
        public TicTacToeHub(HubManagerFactory<TicTacToeHub, ITicTacToeHub> factory)
        {
            //this._userService = userService;
            //this._groupService = groupService;
            //var factory = new HubManagerFactory<TicTacToeHub, ITicTacToeHub>(userService, groupService);
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

        public override async Task LeaveGroup(string groupName)
        {
            // TODOANDI: does this belong in here? Not too easy to implement the Factory here in the constructor
            //this._baseService.LeaveGroupAsync(currentUser, groupName);
        }

        public override async Task<string> JoinGroup(string groupName)
        {
            // TODOANDI: does this belong in here? Not too easy to implement the Factory here in the constructor

            //this._groupService.
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
    }
}
