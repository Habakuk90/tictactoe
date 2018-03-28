using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.Web.TicTacToe.Authorization.Repository;

namespace TicTacToe.Web.TicTacToe.Hubs
{
    public class GameHub : Hub
    {
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();

        private readonly static HashSet<string> _userOnline = new HashSet<string>();
        

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
        public void ChallengePlayer(string selectedPlayer)
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
        /// <param name="challenger"></param>
        /// <param name="response"></param>
        public void ChallengeResponse(string challenger, string challengerConnectionId, string response)
        {
            var gameName = "tictactoe";
            var roomName = gameName + Context.ConnectionId;
            var currentUser = Context.User.Identity.Name;
            var challengerIdList = _connections.GetConnections(challenger).ToList();
            var url = "/games/" + gameName;

            //create Room
            _connections.AddGroup(gameName, Context.ConnectionId);

            roomName = _connections.GetGroupByConId(Context.ConnectionId);
            Groups.AddAsync(Context.ConnectionId, roomName);
            Groups.AddAsync(challengerConnectionId, roomName);

            //invoke Response to use who challenged currentUser
            Clients.Client(challengerConnectionId).SendAsync("Response", currentUser, response);

            //invoke Go to Game to group
            Clients.Group(roomName).SendAsync("GoToGame", url, roomName);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override Task OnConnectedAsync()
        {
            string name = Context.User.Identity.Name;
            if (!String.IsNullOrEmpty(name))
            {
                _connections.Add(name, Context.ConnectionId);
                _userOnline.Add(name);
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
            string name = Context.User.Identity.Name;

            _connections.Remove(name, Context.ConnectionId);
            _userOnline.Remove(name);
            GetConnectedUser();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
