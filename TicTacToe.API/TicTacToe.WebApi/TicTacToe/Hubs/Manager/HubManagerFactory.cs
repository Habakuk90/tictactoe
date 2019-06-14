using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Manager
{
    public class HubManagerFactory<THub, T> where THub : Hub<T> where T : class, IAppHub
    {
        private readonly IUserService<T> _userService;
        private readonly IGroupService<T> _groupService;
        private readonly IHubContext<THub, T> _context;

        public HubManagerFactory(IUserService<T> userService, IGroupService<T> groupService, IHubContext<THub, T> context)
        {
            this._userService = userService;
            this._groupService = groupService;
            this._context = context;
        }


        public HubManager<THub, T> Create()
        {
            var x = new ManagerProperties<THub, T>
            {
                Clients = _context,
                UserService = this._userService,
                GroupService = this._groupService
            };

            return new HubManager<THub, T>(x);
        }
    }
}
