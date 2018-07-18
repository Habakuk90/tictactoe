using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Repository;
//using TicTacToe.WebApi.TicTacToe.Hubs.Repository;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class GameHub : Hub
    {
        public enum ModalStates { Accepted, Declined };

        private readonly ILogger _logger;
        private IGameUserService _gameUserService;
        private IGroupService _groupService;

        public GameHub(ILogger<GameHub> logger, IGameUserService gameUserRepository,
            IGroupService groupService)
        {
            _logger = logger;
            //_context = context;
            _gameUserService = gameUserRepository;
            _groupService = groupService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="room">id:number, name:string, List<GameUserModel></param>
        public void TileClicked(string room, string tileId)
        {
            Clients.Group(room).SendAsync("SwitchTurn");
            Clients.Group(room).SendAsync("TileChange", tileId);
        }

        /// <summary>
        /// Player selected enemy and send Request
        /// </summary>
        /// <param name="selectedPlayer"></param>
        public async Task ChallengePlayer(string enemyName)
        {
            // Clients.User => quick workaround with all ids
            var selectedPlayerIdList = _gameUserService.GetConnectionIds(enemyName).ToList();
            var currentUser = _gameUserService.GetUserByConnection(Context.ConnectionId);

            await Clients.Clients(selectedPlayerIdList)
                .SendAsync("OpenModal", currentUser.Name, Constants.ModalStatus.Challenged);
            //call self
            await Clients.Caller.SendAsync("OpenModal", enemyName, Constants.ModalStatus.Waiting);

        }

        /// <summary>
        /// Invoke Modal to challenger and invoke Response to enemy
        /// </summary>
        /// <param name="enemyName">enemy</param>
        /// <param name="response"></param>
        /// <clientMethod></clientMethod>
        public async Task ChallengeResponse(string enemyName, ModalStates response)
        {
            switch (response)
            {
                case (ModalStates.Accepted):
                    //[TODO] SetUpGame
                    //[TODO] More Games maybe
                    GameUserModel currentUser = _gameUserService.GetUserByConnection(Context.ConnectionId);
                    GameUserModel enemyUser = _gameUserService.GetUserByName(enemyName);
                    var allUser = new List<GameUserModel> { currentUser, enemyUser };
                    _gameUserService.UpdateUser(allUser);
                    var groupName = currentUser.Name + enemyUser.Name;

                    await Clients.Clients(enemyUser.ConnectionIds.ToList())
                        .SendAsync("ChallengeAccepted", groupName, true);

                    await Clients.Caller.SendAsync("ChallengeAccepted", groupName);

                    break;
                case (ModalStates.Declined):
                    //[TODO] Reset Users
                    break;
            }
        }

        /// <summary>
        /// Join Group after a challenge happend
        /// </summary>
        /// <param name="enemyName">User who got challenged</param>
        /// <param name="groupName">represents as currentUserName + enemyUserName</param>
        /// <returns></returns>
        public async Task JoinGroup(string groupName)
        {
            GameUserModel currentUser = new GameUserModel();
            currentUser = _gameUserService.GetUserByConnection(Context.ConnectionId);

            if(currentUser.GroupName == groupName)
            { 
                _groupService.LeaveGroup(currentUser, groupName);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            }

            _groupService.JoinGroup(currentUser, groupName);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }


        public async Task LeaveGroup(string groupName)
        {
            GameUserModel currentUser = new GameUserModel();
            currentUser = _gameUserService.GetUserByConnection(Context.ConnectionId);
            _groupService.LeaveGroup(currentUser, groupName);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        /// <summary>
        /// Marks Current user as online, if new user, add to DB
        /// </summary>
        /// <param name="userName">userName of current User</param>
        public void AddCurrentUser(string userName)
        {
            GameUserModel userModel = _gameUserService.GetUserByName(userName);

            if (Context == null || userModel == null) return;

            //_gameUserService.RemoveUser(userName);
            _gameUserService.AddNewUser(userName, Context.ConnectionId);

            //_gameUserService.UpdateUser(userModel);

            UpdateUserList();
        }

        /// <summary>
        /// Invoke Update current Online Users to all 
        /// [TODO] Dependent on UserStatus
        /// </summary>
        /// <clientMethod>UpdateUserList</clientMethod>
        public async void UpdateUserList()
        {
            var userOnline = _gameUserService.GetOnlineUsers().Select(x => x.Name);
            await Clients.All.SendAsync("UpdateUserList", userOnline);
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

            GameUserModel currentUser = _gameUserService.GetUserByConnection(Context.ConnectionId);
            _gameUserService.RemoveUser(currentUser, Context.ConnectionId);
            UpdateUserList();
            await base.OnDisconnectedAsync(exception);
        }
    }
}

