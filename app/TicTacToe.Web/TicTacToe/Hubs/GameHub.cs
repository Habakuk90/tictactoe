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
            Clients.All.SendAsync("SetConnectedUser", _userOnline.ToList());            
        }

        /// <summary>
        /// Invoke open Modal for challenged Enemy
        /// </summary>
        /// <param name="selectedEnemy"></param>
        public void Challenge(string selectedEnemy)
        {
            var challenger = Context.User.Identity.Name;
            Groups.AddAsync(selectedEnemy, "room");
            Groups.AddAsync(challenger, "room");
            Clients.User(selectedEnemy).SendAsync("Challenged", challenger);
            Clients.User(challenger).SendAsync("Waiting");
            Clients.Caller.SendAsync("waiting");
            
        }

        /// <summary>
        /// Invoke Modal to challenger and invoke Response to enemy
        /// </summary>
        /// <param name="challenger"></param>
        /// <param name="response"></param>
        public void ChallengeResponse(string challenger, string response)
        {
            if (response == "declined")
            {
                return;
            }
            Groups.AddAsync(Context.ConnectionId, "tictactoeRoom");

            Clients.User(challenger).SendAsync("Response", challenger, response);
        }

        public void GameStart(string conId)
        {
            var url = "/games/tictactoe";
            Groups.AddAsync(conId, "tictactoeRoom");

            Clients.Group("tictactoeRoom").SendAsync("GoToGame", url);
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
