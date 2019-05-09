using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class GameHub : BaseHub<IGameHub>
    {
        public enum ModalStates { Accepted, Declined };

        private readonly IUserService _userService;

        public GameHub(IUserService baseService)
            : base(baseService)
        {
            this._userService = baseService;
        }

        /// <summary>
        /// Player selected enemy and send Request
        /// </summary>
        /// <param name="selectedPlayer"></param>
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
        /// Invoke Modal to challenger and invoke Response to enemy
        /// </summary>
        /// <param name="enemyName">enemy</param>
        /// <param name="response"></param>
        /// <clientMethod></clientMethod>
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