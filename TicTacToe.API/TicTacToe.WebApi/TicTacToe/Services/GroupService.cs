using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class GroupService<T> : EntityManager<Group>, IGroupService<T>
    {
        public GroupService(AppDbContext context) : base(context)
        {
            //this._context = context;
        }

        public async Task<Group> GetGroupByName(string groupName)
        {
            Group group;

            group = await _context.Groups.Where(x =>
                x.Name == groupName).FirstOrDefaultAsync();

            return group;
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
        public async Task JoinGroupAsync(User user, Group group)
        {
            UserGroups userGroup = new UserGroups
            {
                UserId = user.ID,
                User = user,
                GroupId = group.ID,
                Group = group
            };

            user.UserGroups.Add(userGroup);
            group.UserGroups.Add(userGroup);

            await this.AddOrUpdate(group);
            // somehow go with userservice?
            //await this.AddOrUpdate(user);
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
        public async Task LeaveGroupAsync(User user, Group group)
        {
            // TODOANDI: doesnt get removed somehow
            user.UserGroups.ToList().RemoveAll(x => x.UserId == user.ID);
            group.UserGroups.ToList().RemoveAll(x => x.GroupId == group.ID);

            if (group.UserGroups.Any())
            {
                await this.Remove(group);
            }
            else
            {
                await this.AddOrUpdate(group);
            }
            // somehow go with userservice?
            //await this.AddOrUpdate(user);
        }
    }
}
