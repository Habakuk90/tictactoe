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

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            IEnumerable<User> allUser;

            allUser = await _context.AppUser.ToListAsync<User>();

            return allUser;
        }


        #region private methods

        public async Task<User> GetUserByName(string userName)
        {
            User user;

            user = await _context.AppUser.Where(x => x.Name == userName)
                .FirstOrDefaultAsync();

            return user;
        }

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

//public class HubUserManager<T> : HubManager<T>, IHubManager<T> where T : class, IAppHub
//{
//    public HubUserManager(IUserService<T> userService, HubM<T> hubM) : base(hubM)
//    {

//    }
//}

//public class HubGroupManager<T> : HubManager<T>, IHubManager<T> where T : class, IAppHub
//{
//    public HubGroupManager(IGroupService<T> groupService, HubM<T> hubM) : base(hubM)
//    {

//    }
//}