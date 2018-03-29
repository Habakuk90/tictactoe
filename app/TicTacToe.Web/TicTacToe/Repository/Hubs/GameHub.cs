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

        private readonly static HashSet<GameUserModel> _userModelOnline = new HashSet<GameUserModel>();

        //[TODO] map two player against each other on connection to "game"

        /// <summary>
        /// 
        /// </summary>
        /// <param name="room">id:number, name:string, List<GameUserModel></param>
        public void TileClicked(RoomModel room)
        {
            Clients.Group(room.RoomName).SendAsync("SwitchTurn");
        }

        public void GetConnectedUser()
        {
            var currentUser = SetCurrentUser();
            Clients.All.SendAsync("SetConnectedUser", currentUser, _userOnline.ToList());
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="selectedPlayer"></param>
        public void ChallengePlayer(GameUserModel selectedPlayer)
        {
            var currentUser = SetCurrentUser();

            // Clients.User => quick workaround with all ids
            var selectedPlayerIdList = _connections.GetConnections(selectedPlayer).ToList();

            Clients.Clients(selectedPlayerIdList)
                .SendAsync("OpenChallengedModal", currentUser, Context.ConnectionId);

            Clients.Caller.SendAsync("OpenWaitingModal");

        }

        /// <summary>
        /// Invoke Modal to challenger and invoke Response to enemy
        /// </summary>
        /// <param name="enemy">enemy</param>
        /// <param name="response"></param>
        public void ChallengeResponse(GameUserModel enemy, string response)
        {
            var currentUser = SetCurrentUser();
            var gameName = "tictactoe";

            RoomModel room = new RoomModel
            {
                RoomName = gameName + currentUser.CurrentConnectionId,
            };
            var challengerIdList = _connections.GetConnections(enemy).ToList();
            var url = "/games/" + gameName;

            //create Room
            _connections.AddGroup(enemy, gameName);

            room.RoomName = _connections.GetGroupByConId(Context.ConnectionId);
            Groups.AddAsync(currentUser.CurrentConnectionId, room.RoomName);
            Groups.AddAsync(enemy.CurrentConnectionId, room.RoomName);

            //invoke Response to use who challenged currentUser
            Clients.Client(enemy.CurrentConnectionId).SendAsync("Response", currentUser, response);

            //invoke Go to Game to group
            Clients.Group(room.RoomName).SendAsync("GoToGame", url, room.RoomName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override Task OnConnectedAsync()
        {
            var currentUser = SetCurrentUser();
            if (currentUser != null)
            {
                _connections.Add(currentUser, Context.ConnectionId);
                _userOnline.Add(currentUser.Name);
                GetConnectedUser();
            }
            else
            {
                Console.WriteLine("user Empty");
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
            var currentUser = SetCurrentUser();
            _connections.Remove(currentUser, Context.ConnectionId);
            _userOnline.Remove(currentUser.Name);
            GetConnectedUser();
            return base.OnDisconnectedAsync(exception);
        }

        public GameUserModel SetCurrentUser()
        {
            return new GameUserModel
            {
                Name = Context.User.Identity.Name,
                CurrentConnectionId = Context.ConnectionId
            };
        }
    }
}
