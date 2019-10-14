using System.Threading.Tasks;
using AppHub;

namespace ChatHub
{
    public class ChatHub : AppHub<IChatClient>
    {
        public async Task<string> BroadcastMessage(string message)
        {
            await this.Clients.All.SendMessage(message);
            return message;
        }
    }

    public interface IChatClient : IAppClient
    {
        Task SendMessage(string message);
    }
}
