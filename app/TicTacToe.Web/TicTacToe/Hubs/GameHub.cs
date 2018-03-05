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

        /// <summary>
        /// Sets Tile after Play for current Player and his Enemy 
        /// </summary>
        /// <param name="tileId">ID of the Tile in grid</param>
        public void SetPlayTicTacToe(string tileId, string enemyName)
        {
            string playerName = Context.User.Identity.Name;
            var playerConnections = _connections.GetConnections(playerName);
            var enemyConnections = _connections.GetConnections(enemyName);
        }
        
        public void TileClicked(string tileId)
        {
            Clients.All.InvokeAsync("tileChange", tileId);
        }

        public void GetConnectedUser()
        {
            Clients.All.InvokeAsync
                ("SetConnectedUser", _userOnline.ToList());
            
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
