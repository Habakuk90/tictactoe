using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Repository;
using TicTacToe.WebApi.TicTacToe.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class GameHub : Hub
    {
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();

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
            //GameUserModel currentUser = SetCurrentUser();

            // Clients.User => quick workaround with all ids
            var selectedPlayerIdList = _connections
                .GetConnections(selectedPlayer).ToList();

            Clients.Clients(selectedPlayerIdList)
                .SendAsync("OpenModal", currentUser, "challenged");
            //call self
            Clients.Caller.SendAsync("OpenModal", selectedPlayer, "waiting");

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
        public void UpdateUserList()
        {
            Clients.All.SendAsync("UpdateUserList", _userOnline);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception exception)
        {

            var currentUser = _connections.GetUserByConnection(Context.ConnectionId);

            _connections.Remove(currentUser, Context.ConnectionId);
            _userOnline.Remove(currentUser);
            UpdateUserList();

            return base.OnDisconnectedAsync(exception);
        }


    }
}
