using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
using TicTacToe.WebApi.TicTacToe.Services;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class GameHub : BaseHub<IGameHub>
    {
        public enum ModalStates { Accepted, Declined };

        private readonly ILogger _logger;

        public GameHub(IUserService userService, IGroupService groupService)
            : base(userService, groupService)
        {
        }

        /// <summary>
        /// Player selected enemy and send Request
        /// </summary>
        /// <param name="selectedPlayer"></param>
        public async Task ChallengePlayer(string enemyName, string gameName)
        {
            GameUserModel currentUser = this._userserService
                .GetUserByConnection(Context.ConnectionId);

            GameUserModel enemyUser = this._userserService
                .GetUserByName(enemyName);

            List<GameUserModel> allUser = new List<GameUserModel>
            {
                currentUser,
                enemyUser
            };

            this._userserService.UpdateUser(allUser, Constants.Status.INGAME);

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
            GameUserModel currentUser = this._userserService.GetUserByConnection(Context.ConnectionId);
            GameUserModel enemyUser = this._userserService.GetUserByName(enemyName);

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

                    this._userserService.UpdateUser(allUser, Constants.Status.ONLINE);

                    break;
            }
        }

        public async Task StartGame(string groupName)
        {
            
            await Clients.Group(groupName).StartGame(groupName);
        }

        /// <summary>
        /// Marks Current user as online, if new user, add to DB
        /// </summary>
        /// <param name="userName">
        /// userName of current User.
        /// </param>
        public void AddCurrentUser(string userName)
        {
            bool userExists = this._userserService.UserExists(userName);
            System.Console.WriteLine(userName);
            GameUserModel user =
                userExists ?
                this._userserService.GetUserByName(userName) :
                new GameUserModel { Name = userName };

            user.CurrentConnectionId = Context.ConnectionId;

            if (userExists)
            {
                this._userserService.UpdateUser(
                    this._userserService.GetUserByName(userName),
                    Constants.Status.ONLINE);
            }
            else
            {
                this._userserService.AddNewUser(user);
            }
        }
    }
}

