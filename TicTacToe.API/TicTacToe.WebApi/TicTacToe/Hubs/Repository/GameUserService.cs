using System;
using System.Collections.Generic;
using System.Linq;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    /// <summary>
    /// Represents a GameUserService which communicates with the DB
    /// </summary>
    public class GameUserService : IGameUserService
    {
        #region private objects

        /// <summary>
        /// private instance of DbContext
        /// </summary>
        private AppDbContext _context;

        #endregion

        /// <summary>
        /// GameUserService Constructor.
        /// </summary>
        /// <param name="context">
        /// the app db context.
        /// </param>
        public GameUserService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets the user with given connection Id.
        /// </summary>
        /// <param name="connectionId">
        /// connection id of the requested User.
        /// </param>
        /// <returns>
        /// The <see cref="GameUserModel"/> with the given connectionId.
        /// </returns>
        public GameUserModel GetUserByConnection(string connectionId)
        {
            // instead of first => by group name || first
            GameUserModel userModel = _context.AppUser.Where(x =>
                x.ConnectionIds.Contains(connectionId)).FirstOrDefault();

            if (userModel == null)
            {
                throw new Exception("no user found");
            }

            userModel.CurrentConnectionId = connectionId;
            return userModel;

        }

        /// <summary>
        /// Gets all ConnectionsIds of given user name.
        /// </summary>
        /// <param name="userName">
        /// user name of requested User.
        /// </param>
        /// <returns>
        /// Enumeration of connectionIds for given userName.
        /// </returns>
        public IEnumerable<string> GetConnectionIds(string userName)
        {
            List<string> connectionIds =
                _context.AppUser.FirstOrDefault(x => x.Name == userName).ConnectionIds;

            return connectionIds;
        }

        /// <summary>
        /// Gets the User by gviven name.
        /// </summary>
        /// <param name="userName">
        /// user name of the requested User.
        /// </param>
        /// <returns>
        /// The <see cref="GameUserModel"/> of the given userName.
        /// </returns>
        public GameUserModel GetUserByName(string userName)
        {
            GameUserModel userModel = _context.AppUser.FirstOrDefault(x => x.Name == userName);

            if (userModel == null)
            {
                throw new Exception("User Not Found");
            }

            return userModel;
        }

        /// <summary>
        /// Gets all current Online User.
        /// </summary>
        /// <returns>
        /// List of the current Online User.
        /// </returns>
        public IQueryable<GameUserModel> GetOnlineUsers()
        {
            return _context.AppUser.Where(x => x.Status == Constants.Status.Online);
        }

        /// <summary>
        /// Adds new User to the Database.
        /// </summary>
        /// <param name="userName">
        /// User name of the new User.
        /// </param>
        /// <param name="connectionId">
        /// connectionId of the new User.
        /// </param>
        public void AddNewUser(string userName, string connectionId)
        {
            GameUserModel userModel = _context.AppUser.Where(x => x.Name == userName).FirstOrDefault();

            if (userModel != null)
            {
                _context.AppUser.Attach(userModel);
                userModel.ConnectionIds.Add(connectionId);
            }
            else
            {
                userModel = new GameUserModel
                {
                    Name = userName
                };
                userModel.ConnectionIds.Add(connectionId);
                _context.AppUser.Add(userModel);

            }
            userModel.Status = Constants.Status.Online;
            userModel.ConnectionIds = userModel.ConnectionIds.Distinct().ToList();
            _context.SaveChanges();
        }

        /// <summary>
        /// Updates user in Database
        /// </summary>
        /// <param name="userModel">
        /// The user to Update.
        /// </param>
        /// <param name="status">
        /// Update given user with this status.
        /// </param>
        public void UpdateUser(GameUserModel userModel, string status)
        {
            userModel.Status = status;
            _context.AppUser.Update(userModel);
            _context.SaveChanges();
        }

        /// <summary>
        /// Updates a list of user with same Status in Database.
        /// </summary>
        /// <param name="userModelList">
        /// the given collection of <see cref="GameUserModel"/>.
        /// </param>
        /// <param name="status">
        /// the given status to update the user.
        /// </param>
        public void UpdateUser(ICollection<GameUserModel> userModelList, string status)
        {
            foreach (GameUserModel userModel in userModelList)
            {
                userModel.ConnectionIds.Distinct();
                userModel.Status = status;
                _context.AppUser.Update(userModel);
            }
            _context.SaveChanges();
        }

        /// <summary>
        /// Remove the given user from Database
        /// </summary>
        /// <param name="currentUser">
        /// the User to remove.
        /// </param>
        /// <param name="currentConnectionId">
        /// the currentConnectionId of the User
        /// </param>
        public void RemoveUser(GameUserModel currentUser, string currentConnectionId)
        {
            if (currentUser == null || currentUser.ConnectionIds == null) return;
            currentUser.ConnectionIds.RemoveAll(conn => conn == currentConnectionId);
            currentUser.Status = Constants.Status.Offline;

            _context.SaveChanges();
        }

        /// <summary>
        /// Remove the given user from Database by name
        /// </summary>
        /// <param name="userName">
        /// the username of User to remove.
        /// </param>
        public void RemoveUser(string userName)
        {
            GameUserModel currentUser = this.GetUserByName(userName);
            if (currentUser == null) return;

            _context.AppUser.Remove(currentUser);
            _context.SaveChanges();
        }
    }
}
