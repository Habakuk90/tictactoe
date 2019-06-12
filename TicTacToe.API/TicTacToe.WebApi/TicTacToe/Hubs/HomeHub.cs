using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Models.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    /// <summary>
    /// Represents a SignalR Hub with <see cref="IHomeHub"/> client methods.
    /// </summary>
    //[Authorize(AuthenticationSchemes = "Bearer")]
    public class HomeHub : BaseHub<IHomeHub>
    {
        private readonly IUserService _userService;

        /// <summary>
        /// GameHub ctor.
        /// </summary>
        /// <param name="userService"></param>
        public HomeHub(IUserService userService)
            : base(userService)
        {
            this._userService = userService;
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
            BaseUser currentUser = await this._userService
                .GetUser(connectionId: Context.ConnectionId);

            BaseUser enemyUser = await this._userService
                .GetUser(name: enemyName);

            List<BaseUser> allUser = new List<BaseUser>
            {
                currentUser,
                enemyUser
            };

            await this._userService.UpdateUser(allUser, Constants.Status.INGAME);

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
            BaseUser currentUser = await this._userService
                .GetUser(connectionId: Context.ConnectionId);
            BaseUser enemyUser = await this._userService
                .GetUser(name: response.EnemyName);

            List<BaseUser> allUser = new List<BaseUser>
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

                    await this._userService.UpdateUser(allUser, Constants.Status.ONLINE);

                    break;
            }
        }
        public override async Task AddCurrentUser(string userName, bool isAnonymous = true)
        {
            var currentUser = new BaseUser
            {
                Name = userName,
                CurrentConnectionId = Context.ConnectionId,
                IsAnonymous = isAnonymous,
                Status = Constants.Status.ONLINE
            };

            await this._userService.UpdateUser(currentUser);
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
            await this._userService.RemoveUser(Context.ConnectionId);
            await base.OnDisconnectedAsync(e);
        }
    }
}