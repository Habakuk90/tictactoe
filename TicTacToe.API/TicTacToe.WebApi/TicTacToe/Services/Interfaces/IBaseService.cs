using System.Collections.Generic;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Services.Interfaces
{
    public interface IBaseService
    {
        void UpdateUserList();

        /// <summary>
        /// Adds new User to DB.
        /// </summary>
        /// <param name="user">
        /// <see cref="GameUserModel"/> to be added into DB.
        /// </param>
        void AddNewUser(GameUserModel user);


        /// <summary>
        /// Gets user by connection from DB.
        /// </summary>
        /// <param name="connectionId">
        /// connection ID which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="GameUserModel"/> in DB with given connectionID.
        /// </returns>s
        GameUserModel GetUserByConnection(string connectionId);

        /// <summary>
        /// Gets user by name from DB.
        /// </summary>
        /// <param name="userName">
        /// username which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="GameUserModel"/> in DB with given userName.
        GameUserModel GetUserByName(string userName);


        /// <summary>
        /// Removes all connection ID's and sets <see cref="GameUserModel"/> as offline
        /// </summary>
        /// <param name="user">
        /// User which should be removed.
        /// </param>
        /// <param name="currentConnectionId">
        /// current connection Id of user which should be removed.
        /// </param>
        void RemoveUser(GameUserModel user, string currentConnectionId);

        /// <summary>
        /// Updates user in DB.
        /// </summary>
        /// <param name="user">
        /// <see cref="GameUserModel"/> which should be updated in DB.
        /// </param>
        /// <param name="status">
        /// Status <see cref="Constants.Status"/> of user.
        /// </param>
        void UpdateUser(GameUserModel user, string status);

        /// <summary>
        /// Updates list of user in DB.
        /// </summary>
        /// <param name="users">
        /// Collection of user which should be updated in DB.
        /// </param>
        /// <param name="status">
        /// <see cref="Constants.Status"/> of users.
        /// </param>
        void UpdateUser(ICollection<GameUserModel> users, string status);

        /// <summary>
        /// Checks if User exists in DB.
        /// </summary>
        /// <param name="userName">
        /// Given name of user to check.
        /// </param>
        /// <returns>
        /// Whether user exists in DB or not.
        /// </returns>
        bool UserExists(string userName);

        /// <summary>
        /// Join Group for connection and database
        /// </summary>
        /// <param name="user">
        /// User who joins the group.
        /// </param>
        /// <param name="groupName">
        /// The group name
        /// </param>
        Task JoinGroupAsync(GameUserModel userModel, string groupName);

        /// <summary>
        /// Leave Group for connection and database.
        /// </summary>
        /// <param name="user">
        /// User who leaves the group.
        /// </param>
        /// <param name="groupName">
        /// Group name which will be left.
        /// </param>
        Task LeaveGroupAsync(GameUserModel userModel, string groupName);
    }
}
