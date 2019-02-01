using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Repository;
using TicTacToe.WebApi.TicTacToe.Services;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class GameHub : Hub<IGameHub>
    {
        public enum ModalStates { Accepted, Declined };

        private readonly ILogger _logger;
        private IGameUserService _gameUserService;
        private IGroupService _groupService;
        private GameService _game;

        public GameHub(ILogger<GameHub> logger, IGameUserService gameUserService,
            IGroupService groupService, GameService game)
        {
            this._logger = logger;
            this._gameUserService = gameUserService;
            this._groupService = groupService;
            this._game = game;
        }

        public string SendMessage()
        {
            return _game.SendMessage2();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="room">id:number, name:string, List<GameUserModel></param>
        public void TileClicked(string room, string tileId)
        {
            Clients.Group(room).SwitchTurn();
            Clients.Group(room).TileChange(tileId);
        }

        /// <summary>
        /// Player selected enemy and send Request
        /// </summary>
        /// <param name="selectedPlayer"></param>
        public async Task ChallengePlayer(string enemyName, string gameName)
        {
            GameUserModel currentUser = _gameUserService
                .GetUserByConnection(Context.ConnectionId);

            GameUserModel enemyUser = _gameUserService.GetUserByName(enemyName);

            List<GameUserModel> allUser = new List<GameUserModel>
            {
                currentUser,
                enemyUser
            };

            _gameUserService.UpdateUser(allUser, Constants.Status.INGAME);

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
            GameUserModel currentUser = _gameUserService.GetUserByConnection(Context.ConnectionId);
            GameUserModel enemyUser = _gameUserService.GetUserByName(enemyName);

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

                    _gameUserService.UpdateUser(allUser, Constants.Status.ONLINE);

                    break;
            }
        }

        public async Task StartGame(string groupName)
        {
            await Clients.Group(groupName).StartGame(groupName);
        }

        /// <summary>
        /// Join Group after a challenge happend
        /// </summary>
        /// <param name="enemyName">User who got challenged</param>
        /// <param name="groupName">represents as currentUserName + enemyUserName</param>
        /// <returns></returns>
        public void JoinGroup(string groupName)
        {
            GameUserModel currentUser = _gameUserService
                .GetUserByConnection(Context.ConnectionId);

            if (currentUser.GroupName == groupName)
            {
                _groupService.LeaveGroupAsync(currentUser, groupName);
            }

            _groupService.JoinGroupAsync(currentUser, groupName);
            _gameUserService.UpdateUserList();
        }


        public void LeaveGroup(string groupName)
        {
            GameUserModel currentUser = _gameUserService
                .GetUserByConnection(Context.ConnectionId);

            _groupService.LeaveGroupAsync(currentUser, groupName);
        }

        /// <summary>
        /// Marks Current user as online, if new user, add to DB
        /// </summary>
        /// <param name="userName">
        /// userName of current User.
        /// </param>
        public void AddCurrentUser(string userName)
        {
            bool userExists = _gameUserService.UserExists(userName);

            GameUserModel user =
                userExists ?
                _gameUserService.GetUserByName(userName) :
                new GameUserModel { Name = userName };

            user.CurrentConnectionId = Context.ConnectionId;

            if (userExists)
            {
                _gameUserService.UpdateUser(
                    _gameUserService.GetUserByName(userName),
                    Constants.Status.ONLINE);
            }
            else
            {
                _gameUserService.AddNewUser(user);
            }
        }

        /// <summary>
        /// Send GameOver to specific Group
        /// </summary>
        /// <param name="groupName">Group Name given by the frontend</param>
        public void GameOver(string groupName, string winningTileId, string winningLine)
        {
            Clients.Group(groupName).GameOver(winningTileId, winningLine);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            GameUserModel currentUser = _gameUserService
                .GetUserByConnection(Context.ConnectionId);

            _gameUserService.RemoveUser(currentUser, Context.ConnectionId);
            await _groupService.LeaveGroupAsync(currentUser, currentUser.GroupName);
            await base.OnDisconnectedAsync(exception);
        }
    }
}

