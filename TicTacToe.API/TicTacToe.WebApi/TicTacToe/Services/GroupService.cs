using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class GroupService : IGroupService
    {
        private readonly IAppGroupManager<HomeHub, IHomeHub> _manager;

        public GroupService(IAppGroupManager<HomeHub, IHomeHub> manager)
        {
            this._manager = manager;
        }


        /// <summary>
        /// Join Group for connection and database
        /// </summary>
        /// <param name="user">
        /// User who joins the group.
        /// </param>
        /// <param name="groupName">
        /// The group name
        /// </param>
        public async Task JoinGroupAsync(User userModel, string groupName)
        {

        }

        /// <summary>
        /// Leave Group for connection and database.
        /// </summary>
        /// <param name="user">
        /// User who leaves the group.
        /// </param>
        /// <param name="groupName">
        /// Group name which will be left.
        /// </param>
        public async Task LeaveGroupAsync(User userModel, string groupName)
        {

        }
    }
}
