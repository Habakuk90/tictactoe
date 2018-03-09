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

        public Dictionary<string,string> Matchup = new Dictionary<string, string>();
        //[TODO] map two player against each other on connection to "game"

        
        public void TileClicked(string tileId)
        {
            Clients.All.InvokeAsync("tileChange", tileId);
        }

        public void GetConnectedUser()
        {
            Clients.All.InvokeAsync("SetConnectedUser", _userOnline.ToList());            
        }

        /// <summary>
        /// Invoke open Modal for challenged Enemy
        /// </summary>
        /// <param name="selectedEnemy"></param>
        public void Challenge(string selectedEnemy)
        {
            var challenger = Context.User.Identity.Name;
            Clients.User(selectedEnemy).InvokeAsync("challenged", challenger);
        }

        /// <summary>
        /// Invoke Modal Answer to challenger
        /// </summary>
        /// <param name="challenger"></param>
        public void AcceptedChallenge(string challenger)
        {
            Clients.User(challenger).InvokeAsync("Accepted");
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
