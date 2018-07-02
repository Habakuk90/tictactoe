using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Repository;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class GameHub : Hub
    {
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();

        private static Dictionary<string, string> _connectionGroups =
            new Dictionary<string, string>();

        private readonly static HashSet<string> _userOnline = new HashSet<string>();

        public enum ModalStates { Accepted, Declined };

        /// <summary>
        /// 
        /// </summary>
        /// <param name="room">id:number, name:string, List<GameUserModel></param>
        public void TileClicked(string room, string id1, string id2, string tileId)
        {
            Clients.Group(room).SendAsync("SwitchTurn");
            Clients.Group(room).SendAsync("TileChange", tileId);
        }

        public IEnumerable<string> GetAllUser()
        {
            return _userOnline.ToList();
        }

        public string Send(string message)
        {
            return message;
        }

        public void SendAll(string message)
        {
            //Clients.All.SendAsync("SendAll", message);
            var x = _connections.GetConnections("User").ToList();
            Clients.Clients(x).SendAsync("Test", "SUPA TEST");
        }

        /// <summary>
        /// Player selected enemy and send Request
        /// </summary>
        /// <param name="selectedPlayer"></param>
        public void ChallengePlayer(string currentUser, string selectedPlayer)
        {
            // Clients.User => quick workaround with all ids
            var selectedPlayerIdList = _connections
                .GetConnections(selectedPlayer).ToList();

            Clients.Clients(selectedPlayerIdList)
                .SendAsync("OpenModal", currentUser, Constants.ModalStatus.Challenged);
            //call self
            Clients.Caller.SendAsync("OpenModal", selectedPlayer, Constants.ModalStatus.Waiting);

        }

        /// <summary>
        /// Invoke Modal to challenger and invoke Response to enemy
        /// </summary>
        /// <param name="enemy">enemy</param>
        /// <param name="response"></param>
        /// <clientMethod></clientMethod>
        public void ChallengeResponse(string enemy, ModalStates response)
        {
            switch (response)
            {
                case (ModalStates.Accepted):
                    //[TODO] SetUpGame
                    //[TODO] More Games maybe
                    var userName = _connections.GetUserByConnection(Context.ConnectionId);

                    var enemyPlayerIdList = _connections
                        .GetConnections(enemy).ToList();

                    Clients.Clients(enemyPlayerIdList)
                        .SendAsync("ChallengeAccepted", userName);

                    Clients.Caller.SendAsync("ChallengeAccepted", enemy);

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
        public async Task JoinGroup(string enemyName, string groupName)
        {
            GameUserModel currentUser = new GameUserModel
            {
                Name = _connections.GetUserByConnection(Context.ConnectionId)
            };

            GameUserModel enemyUser = new GameUserModel
            {
                Name = enemyName,
                ConnectionIds = _connections.GetConnections(enemyName).ToList()
            };

            currentUser.ConnectionIds = _connections.GetConnections(currentUser.Name).ToList();

            var allGroupPlayerIds = enemyUser.ConnectionIds
                                             .Union(currentUser.ConnectionIds);

            if (_connectionGroups.ContainsKey(currentUser.Name))
            {
                await Groups.RemoveFromGroupAsync(currentUser.Name, _connectionGroups[currentUser.Name]);
                _connectionGroups.Remove(currentUser.Name);
            }
            _connectionGroups.Add(currentUser.Name, groupName);
            _connectionGroups.Add(enemyName, groupName);

            foreach (var item in allGroupPlayerIds)
            {
                await Groups.AddToGroupAsync(item, groupName);
            }
            await Clients.Group(groupName).SendAsync("UpdateGroup", groupName);
        }

        public void AddCurrentUser(string userName)
        {
            if (Context != null)
            {
                _connections.Add(userName, Context.ConnectionId);
                _userOnline.Add(userName);
                UpdateUserList();
            }
        }

        /// <summary>
        /// Invoke Update current Online Users to all 
        /// [TODO] Dependent on UserStatus
        /// </summary>
        /// <clientMethod>UpdateUserList</clientMethod>
        public async void UpdateUserList()
        {
            await Clients.All.SendAsync("UpdateUserList", _userOnline);
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

            GameUserModel currentUser = new GameUserModel
            {
                Name = _connections.GetUserByConnection(Context.ConnectionId)
            };
            _connections.Remove(currentUser.Name, Context.ConnectionId);
            _userOnline.Remove(currentUser.Name);
            UpdateUserList();
            if (_connectionGroups.ContainsKey(currentUser.Name))
            {
                await Groups.RemoveFromGroupAsync(currentUser.Name, _connectionGroups[currentUser.Name]);
                _connectionGroups.Remove(currentUser.Name);
            }
            await base.OnDisconnectedAsync(exception);
        }


    }
}
