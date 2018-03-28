using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.Web.TicTacToe.Authorization.Repository;
using TicTacToe.Web.TicTacToe.Game.Models;

namespace TicTacToe.Web.TicTacToe.Hubs
{
    public class GameHub : Hub
    {
        private readonly static ConnectionMapping<GameUserModel> _connections =
            new ConnectionMapping<GameUserModel>();

        private readonly static HashSet<string> _userOnline = new HashSet<string>();


        private GameUserModel _userModel = new GameUserModel();
        //[TODO] map two player against each other on connection to "game"

        public void TileClicked(string roomName)
        {
            Clients.Group(roomName).SendAsync("SwitchTurn");
        }

        public void GetConnectedUser()
        {
            var currentUser = Context.User.Identity.Name;
            Clients.All.SendAsync("SetConnectedUser", currentUser, _userOnline.ToList());
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="selectedPlayer"></param>
        public void ChallengePlayer(GameUserModel selectedPlayer)
        {
            var currentUserName = Context.User.Identity.Name;

            // Clients.User => quick workaround with all ids
            var selectedPlayerIdList = _connections.GetConnections(selectedPlayer).ToList();
            Clients.Clients(selectedPlayerIdList)
                .SendAsync("OpenChallengedModal", currentUserName, Context.ConnectionId);


            Clients.Caller.SendAsync("OpenWaitingModal");

        }

        /// <summary>
        /// Invoke Modal to challenger and invoke Response to enemy
        /// </summary>
        /// <param name="enemy">enemy</param>
        /// <param name="response"></param>
        public void ChallengeResponse(GameUserModel enemy, string response)
        {
            GameUserModel currentUser = new GameUserModel
            {
                Name = Context.User.Identity.Name,
                CurrentConnectionId = Context.ConnectionId
            };

            var challengerCurrentId = enemy.CurrentConnectionId;


            var gameName = "tictactoe";
            var roomName = gameName + Context.ConnectionId;
            var challengerIdList = _connections.GetConnections(enemy).ToList();
            var url = "/games/" + gameName;

            //create Room
            _connections.AddGroup(enemy, gameName);

            roomName = _connections.GetGroupByConId(Context.ConnectionId);
            Groups.AddAsync(Context.ConnectionId, roomName);
            Groups.AddAsync(enemy.CurrentConnectionId, roomName);

            //invoke Response to use who challenged currentUser
            Clients.Client(challengerCurrentId).SendAsync("Response", currentUser, response);

            //invoke Go to Game to group
            Clients.Group(roomName).SendAsync("GoToGame", url, roomName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override Task OnConnectedAsync()
        {
            _userModel.Name = Context.User.Identity.Name;
            _userModel.CurrentConnectionId = Context.ConnectionId;
            if (_userModel != null)
            {
                _connections.Add(_userModel, Context.ConnectionId);
                _userOnline.Add(_userModel.Name);
                GetConnectedUser();
            }
            else
            {
                Console.WriteLine("name empty");
            }
            
            return base.OnConnectedAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception exception)
        {
            _connections.Remove(_userModel, Context.ConnectionId);
            _userOnline.Remove(_userModel.Name);
            GetConnectedUser();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
