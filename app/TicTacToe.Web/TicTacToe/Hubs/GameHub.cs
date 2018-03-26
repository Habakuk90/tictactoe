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

        
        public void TileClicked(string tileId)
        {
            Clients.All.SendAsync("tileChange", tileId);
        }

        public void GetConnectedUser()
        {
            var currentUser = Context.User.Identity.Name;
            Clients.All.SendAsync("SetConnectedUser", currentUser, _userOnline.ToList());            
        }

        /// <summary>
        /// Invoke open Modal for challenged Enemy
        /// </summary>
        /// <param name="selectedEnemy"></param>
        public void Challenge(string selectedPlayer)
        {
            var currentUserName = Context.User.Identity.Name;

            // Clients.User => quick workaround with all ids
            var selectedPlayerIdList = _connections.GetConnections(selectedPlayer).ToList();
            Clients.Clients(selectedPlayerIdList)
                .SendAsync("Challenged", currentUserName);

            Clients.User(currentUserName).SendAsync("Challenged", currentUserName);
            Clients.Caller.SendAsync("Waiting");
            
        }

        /// <summary>
        /// Invoke Modal to challenger and invoke Response to enemy
        /// </summary>
        /// <param name="challenger"></param>
        /// <param name="response"></param>
        public void ChallengeResponse(string challenger, string response)
        {
            Groups.AddAsync(Context.ConnectionId, "tictactoeRoom");
            _connections.AddGroup("tictactoeRoom", Context.ConnectionId);
            var currentUser = Context.User.Identity.Name;
            var challengerIdList = _connections.GetConnections(challenger).ToList();

            Clients.Clients(challengerIdList).SendAsync("Response", currentUser, response);
        }

        public void GameStart()
        {
            var conId = Context.ConnectionId;
            var url = "/games/tictactoe";
            var roomName = "tictactoeRoom";

            Groups.AddAsync(conId, roomName);
            _connections.AddGroup("tictactoeRoom", Context.ConnectionId);

            Clients.Group(roomName).SendAsync("GoToGame", url, roomName);
        }
        public void DecideTurn(string roomName)
        {
            Random random = new Random();
            var flip = (random.Next(0, 2));
            var groupConnections = _connections.GetGroups(roomName);

           

            var firstId = groupConnections.ToList()[flip];
            var secondId = groupConnections.FirstOrDefault(x => x != firstId);

            Clients.Client(firstId).SendAsync("SetSequence", true);
            Clients.Client(secondId).SendAsync("SetSequence", false);


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
