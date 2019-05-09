using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    /// <summary>
    /// Represents a SignalR Hub with <see cref="IGameHub"/> client methods.
    /// </summary>
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class GameHub : BaseHub<IGameHub>
    {
        private readonly IUserService _userService;

        /// <summary>
        /// GameHub ctor.
        /// </summary>
        /// <param name="baseService"></param>
        public GameHub(IUserService baseService)
            : base(baseService)
        {
            this._userService = baseService;
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
            GameUserModel currentUser = this._userService
                .GetUserByConnection(Context.ConnectionId);

            GameUserModel enemyUser = this._userService
                .GetUserByName(enemyName);

            List<GameUserModel> allUser = new List<GameUserModel>
            {
                currentUser,
                enemyUser
            };

            this._userService.UpdateUser(allUser, Constants.Status.INGAME);

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
        public async Task ChallengeResponse(string enemyName, string gameName, ModalStates response)
        {
            GameUserModel currentUser = this._userService.GetUserByConnection(Context.ConnectionId);
            GameUserModel enemyUser = this._userService.GetUserByName(enemyName);

            List<GameUserModel> allUser = new List<GameUserModel>
            {
                currentUser,
                enemyUser
            };

            switch (response)
            {
                case (ModalStates.Accepted):
                    //[TODO] More Games
                    string groupName = currentUser.Name + enemyUser.Name;

                    await this.Clients.Clients(enemyUser.ConnectionIds).
                        StartGame(groupName, gameName);

                    await this.Clients.Caller.StartGame(groupName, gameName);

                    break;
                case (ModalStates.Declined):
                    await Clients.Clients(enemyUser.ConnectionIds)
                        .OpenModal(enemyName, gameName, Constants.ModalStatus.DECLINED);

                    this._userService.UpdateUser(allUser, Constants.Status.ONLINE);

                    break;
            }
        }

        //TODOANDI Different naming
        public async Task StartGame(string groupName)
        {
            
            await Clients.Group(groupName).StartGame(groupName);
        }
    }
}