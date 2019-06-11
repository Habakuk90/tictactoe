using System.Collections.Generic;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces
{
    public interface IUserService : IBaseService
    {
        Task<BaseUser> GetUser(string name = "", string connectionId = "");

        /// <summary>
        /// Removes all connection ID's and sets <see cref="BaseUser"/> as offline
        /// </summary>
        /// <param name="connectionId">
        /// User which should be removed.
        /// </param>
        /// <param name="currentConnectionId">
        /// current connection Id of user which should be removed.
        /// </param>
        Task RemoveUser(string connectionId);

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
        Task UpdateUser(ICollection<BaseUser> users, string status);
    }
}