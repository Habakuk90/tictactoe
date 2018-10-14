using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    public interface IGameUserService 
    {
        /// <summary>
        /// Gets the user with given connection Id.
        /// </summary>
        /// <param name="connectionId">
        /// connection id of the requested User.
        /// </param>
        /// <returns>
        /// The <see cref="GameUserModel"/> with the given connectionId.
        /// </returns>
        GameUserModel GetUserByConnection(string connectionId);

        /// <summary>
        /// Gets all ConnectionsIds of given user name.
        /// </summary>
        /// <param name="userName">
        /// user name of requested User.
        /// </param>
        /// <returns>
        /// Enumeration of connectionIds for given userName.
        /// </returns>
        IEnumerable<string> GetConnectionIds(string userName);

        /// <summary>
        /// Gets the User by gviven name.
        /// </summary>
        /// <param name="userName">
        /// user name of the requested User.
        /// </param>
        /// <returns>
        /// The <see cref="GameUserModel"/> of the given userName.
        /// </returns>
        GameUserModel GetUserByName(string userName);

        /// <summary>
        /// Gets all current Online User.
        /// </summary>
        /// <returns>
        /// List of the current Online User.
        /// </returns>
        IQueryable<GameUserModel> GetOnlineUsers();

        /// <summary>
        /// Adds new User to the Database.
        /// </summary>
        /// <param name="userName">
        /// User name of the new User.
        /// </param>
        /// <param name="connectionId">
        /// connectionId of the new User.
        /// </param>
        void AddNewUser(string userName, string connectionIdl);

        /// <summary>
        /// Updates user in Database
        /// </summary>
        /// <param name="userModel">
        /// The user to Update.
        /// </param>
        /// <param name="status">
        /// Update given user with this status.
        /// </param>
        void UpdateUser(GameUserModel userModel, string status);

        /// <summary>
        /// Updates a list of user with same Status in Database.
        /// </summary>
        /// <param name="userModelList">
        /// the given collection of <see cref="GameUserModel"/>.
        /// </param>
        /// <param name="status">
        /// the given status to update the user.
        /// </param>
        void UpdateUser(ICollection<GameUserModel> userModel, string status);

        /// <summary>
        /// Remove the given user from Database
        /// </summary>
        /// <param name="currentUser">
        /// the User to remove.
        /// </param>
        /// <param name="currentConnectionId">
        /// the currentConnectionId of the User
        /// </param>
        void RemoveUser(GameUserModel userModel, string currentConnectionId);

        /// <summary>
        /// Remove the given user from Database by name
        /// </summary>
        /// <param name="userName">
        /// the username of User to remove.
        /// </param>
        void RemoveUser(string userName);
    }
}
