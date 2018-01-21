using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe_Core
{
    public class HitCounterHub : Hub
    {
        private static int _hitCounter = 0;

        public void RecordHit(string message, string id)
        {
            _hitCounter += 1;

            this.Clients.All.InvokeAsync("Hit", message, id);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _hitCounter -= 1;
            
            Clients.All.InvokeAsync("Hit", this.Context.Connection.ConnectionAbortedToken.CanBeCanceled + " has left");
            return base.OnDisconnectedAsync(exception);
        }
    }
}
