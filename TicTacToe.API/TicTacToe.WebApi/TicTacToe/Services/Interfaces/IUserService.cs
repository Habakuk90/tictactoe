using System.Collections.Generic;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces
{
    public interface IUserService : IBaseService
    {
        /// <summary>
        /// Gets user by connection from DB.
        /// </summary>
        /// <param name="connectionId">
        /// connection ID which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="BaseUser"/> in DB with given connectionID.
        /// </returns>s
        BaseUser GetUserByConnection(string connectionId);

        /// <summary>
        /// Gets user by name from DB.
        /// </summary>
        /// <param name="userName">
        /// username which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="BaseUser"/> in DB with given userName.
        BaseUser GetUserByName(string userName);


        /// <summary>
        /// Removes all connection ID's and sets <see cref="BaseUser"/> as offline
        /// </summary>
        /// <param name="user">
        /// User which should be removed.
        /// </param>
        /// <param name="currentConnectionId">
        /// current connection Id of user which should be removed.
        /// </param>
        Task RemoveUser(BaseUser user);

        /// <summary>
        /// Updates user in DB.
        /// </summary>
        /// <param name="user">
        /// <see cref="BaseUser"/> which should be updated in DB.
        /// </param>
        /// <param name="status">
        /// Status <see cref="Constants.Status"/> of user.
        /// </param>
        //BaseUser UpdateUser(string userName, string connectionId, string status);
        Task UpdateUser(BaseUser user);


        /// <summary>
        /// Updates list of user in DB.
        /// </summary>
        /// <param name="users">
        /// Collection of user which should be updated in DB.
        /// </param>
        /// <param name="status">
        /// <see cref="Constants.Status"/> of users.
        /// </param>
        void UpdateUser(ICollection<BaseUser> users, string status);

        ///// <summary>
        ///// Checks if User exists in DB.
        ///// </summary>
        ///// <param name="userName">
        ///// Given name of user to check.
        ///// </param>
        ///// <returns>
        ///// Whether user exists in DB or not.
        ///// </returns>
        //bool UserExists(string userName);

    }
}