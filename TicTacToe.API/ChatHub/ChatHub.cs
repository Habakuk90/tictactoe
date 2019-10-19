using System.Collections.Generic;
using System.Threading.Tasks;
using AppHub;

namespace ChatHub
{
    public class ChatHub : AppHub<IChatClient>
    {
        public async Task<string> BroadcastMessage(string message)
        {
            await this.Clients.All.SendMessage(this.Context.ConnectionId);

            await this.Clients.All.SendMessage(this.Context.Items);

            return message;
        }

        public override Task OnConnectedAsync()
        {
            this.Context.Items.Add("foo", "baar");

            return base.OnConnectedAsync();
        }
    }

    public interface IChatClient : IAppClient
    {
        Task SendMessage(string message);

        Task SendMessage(IDictionary<object, object> items);
    }
}
