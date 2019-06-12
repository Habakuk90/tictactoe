using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Services.Interfaces
{
    public interface IGroupService : IBaseService
    {
        /// <summary>
        /// Join Group for connection and database
        /// </summary>
        /// <param name="user">
        /// User who joins the group.
        /// </param>
        /// <param name="groupName">
        /// The group name
        /// </param>
        Task JoinGroupAsync(User userModel, string groupName);

        /// <summary>
        /// Leave Group for connection and database.
        /// </summary>
        /// <param name="user">
        /// User who leaves the group.
        /// </param>
        /// <param name="groupName">
        /// Group name which will be left.
        /// </param>
        Task LeaveGroupAsync(User userModel, string groupName);

        ///// <summary>
        ///// Updates the UserList for all Clients.
        ///// </summary>
        //void UpdateUserList();

    }
}
