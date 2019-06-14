using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Manager;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Models.Hubs;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    /// <summary>
    /// Represents a SignalR Hub with <see cref="IHomeHub"/> client methods.
    /// </summary>
    //[Authorize(AuthenticationSchemes = "Bearer")]
    public class HomeHub : AppHub<IHomeHub>
    {
        // TODOANDI: check if there's a better way than AppHub<IHomeHub> 
        private readonly IHubManager<HomeHub, IHomeHub> _manager;
        /// <summary>
        /// GameHub ctor.
        /// </summary>
        /// <param name="userService"></param>
        public HomeHub(HubManagerFactory<HomeHub, IHomeHub> factory)
        {
            this._manager = factory.Create();
        }

        /// <summary>
        /// Challenge Player client Hub method.
        /// </summary>
        /// <param name="enemyName">
        /// Name of the challenged player.
        /// </param>
        /// <param name="gameName">
        /// Name of the selected Game
        /// </param>
        public async Task ChallengePlayer(string enemyName, string gameName)
        {
            User currentUser = await this._manager
                .GetUser(connectionId: Context.ConnectionId);

            User enemyUser = await this._manager
                .GetUser(name: enemyName);

            List<User> allUser = new List<User>
            {
                currentUser,
                enemyUser
            };

            allUser.ForEach(x => x.Status = Constants.Status.INGAME);

            await this._manager.UpdateUser(allUser);

            // fixme dont call all connection ids but only one.
            await Clients.Clients(enemyUser.ConnectionIds)
                .OpenModal(currentUser.Name, gameName, Constants.ModalStatus.CHALLENGED);
            //call self
            await Clients.Caller.OpenModal(enemyName, gameName, Constants.ModalStatus.WAITING);
        }

        /// <summary>
        /// ChallengeResponse client Hub method.
        /// </summary>
        /// <param name="enemyName">
        /// Name of the challenging player.
        /// </param>
        /// <param name="gameName">
        /// Name of the selected game.
        /// </param>
        /// <param name="response">
        /// Response of the challenged player.
        /// </param>
        public async Task ChallengeResponse(ChallengeResponse response)
        {
            User currentUser = await this._manager
                .GetUser(connectionId: Context.ConnectionId);
            User enemyUser = await this._manager
                .GetUser(name: response.EnemyName);

            List<User> allUser = new List<User>
            {
                currentUser,
                enemyUser
            };

            switch (response.Response)
            {
                case (ModalStates.Accepted):
                    //[TODO] More Games
                    string groupName = currentUser.Name + enemyUser.Name;

                    await this.Clients.Clients(enemyUser.ConnectionIds).
                        StartGame(groupName, response.GameName);

                    await this.Clients.Caller.StartGame(groupName, response.GameName);

                    break;
                case (ModalStates.Declined):
                    await Clients.Clients(enemyUser.ConnectionIds)
                        .OpenModal(response.EnemyName, response.GameName, Constants.ModalStatus.DECLINED);

                    allUser.ForEach(x => x.Status = Constants.Status.ONLINE);

                    await this._manager.UpdateUser(allUser);

                    break;
            }
        }

        public override async Task AddCurrentUser(string userName, bool isAnonymous = true)
        {
            var currentUser = new User
            {
                Name = userName,
                CurrentConnectionId = Context.ConnectionId,
                IsAnonymous = isAnonymous,
                Status = Constants.Status.ONLINE
            };

            await this._manager.UpdateUser(currentUser);
        }

        //TODOANDI Different naming
        public async Task StartGame(string groupName)
        {

            await Clients.Group(groupName).StartGame(groupName);
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

        public override Task<string> JoinGroup(string groupName)
        {
            throw new NotImplementedException();
        }

        public override Task LeaveGroup(string groupName)
        {
            throw new NotImplementedException();
        }
    }
}