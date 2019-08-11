using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Services.Interfaces
{
    public interface IGroupService<T> : IBaseService<Group>
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
        Task JoinGroupAsync(User userModel, Group group);

        /// <summary>
        /// Leave Group for connection and database.
        /// </summary>
        /// <param name="user">
        /// User who leaves the group.
        /// </param>
        /// <param name="groupName">
        /// Group name which will be left.
        /// </param>
        Task LeaveGroupAsync(User userModel, Group group);

        ///// <summary>
        ///// Updates the UserList for all Clients.
        ///// </summary>
        //void UpdateUserList();

        Task<Group> GetGroupByName(string groupName);

    }
}
