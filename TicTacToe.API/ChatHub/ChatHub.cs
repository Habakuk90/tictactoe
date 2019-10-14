using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs;

namespace ChatHub
{
    public class ChatHub : AppHub<IChatClient>
    {
        public async Task BroadcastMessage(string message)
        {
            await this.Clients.All.SendMessage(message);
            //this.Clients.Clients()
            //return message;
        }
    }

    public interface IChatClient : IAppClient
    {
        Task SendMessage(string message);



    }
}
