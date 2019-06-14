using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class UserService<T> : EntityManager<User>, IUserService<T>
    {
        #region private properties

        #endregion

        public UserService(AppDbContext context) : base(context)
        {
        }

        /// <summary>
        /// Gets All Users
        /// </summary>
        /// <returns>
        /// List off all users which are registred in database.
        /// </returns>
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            IEnumerable<User> allUser;

            allUser = await _context.AppUser.ToListAsync<User>();

            return allUser;
        }


        #region private methods


        /// <summary>
        /// Gets a user by name from database
        /// </summary>
        /// <param name="userName">
        /// Name which the user should be searched for.
        /// </param>
        /// <returns>
        /// <see cref="User"/> user with given name.
        /// </returns>
        public async Task<User> GetUserByName(string userName)
        {
            User user;

            user = await _context.AppUser.Where(x => x.Name == userName)
                .FirstOrDefaultAsync();

            return user;
        }

        /// <summary>
        /// Gets the user by connection from database.
        /// </summary>
        /// <param name="connectionId">
        /// connection id which will be searched for.
        /// </param>
        /// <returns>
        /// <see cref="User"/> with connectionId.
        /// </returns>
        public async Task<User> GetUserByConnection(string connectionId)
        {
            User user;

            // instead of first => by group name || first
            user = await _context.AppUser.Where(x =>
                x.ConnectionIds.Contains(connectionId)).FirstOrDefaultAsync();

            if (user != null)
            {
                user.CurrentConnectionId = connectionId;
            }

            return user;
        }

        #endregion
    }
}