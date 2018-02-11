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
        
        public void Send(string userId, string message)
        {
            string name = Context.User.Identity.Name;

            Clients.Client(userId).InvokeAsync("SendUser", _connections.GetConnections(name)); // Client(userId); SignalR Websocket Connection Id, Client
            Clients.User(name).InvokeAsync("SendUser", _connections.GetConnections(name)); // User(name); Identity User 
            var conUser = Context.Connection.User;
            var nonConUser = Context.User;
        }

        
        public void Hit(string color, string containerId)
        {
            Clients.All.InvokeAsync("Hit", color, containerId);
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

            return base.OnDisconnectedAsync(exception);
        }
    }
}
