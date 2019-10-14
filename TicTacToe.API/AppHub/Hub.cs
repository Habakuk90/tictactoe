﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    /// <summary>
    /// Represents an abstract BaseHub with all User relevant connection Methods
    /// </summary>
    /// <typeparam name="T">
    /// Hub class.
    /// </typeparam>
    public abstract class AppHub<T> : Hub<T> where T : class, IAppClient
    {
        private readonly ILogger _logger;

        public AppHub()
        {
        }
        #region public abstract

        /// <summary>
        /// Join Group hub method.
        /// </summary>
        /// <param name="groupName">
        /// given name for group from frontend
        /// </param>
        /// <returns>
        /// Same groupname
        /// </returns>
        //public abstract Task<string> JoinGroup(string groupName);

        ///// <summary>
        ///// Leave Group Hub method.
        ///// </summary>
        ///// <param name="groupName">
        ///// Given name for group from frontend.
        ///// </param>
        //public abstract Task<string> LeaveGroup(string groupName);

        ///// <summary>
        ///// Marks Current user as online, if new user, add to DB
        ///// </summary>
        ///// <param name="userName">
        ///// userName of current User.
        ///// </param>
        //public abstract Task AddCurrentUser(string userName, bool isAnonymous = true);

        #endregion

        #region public override

        /// <summary>
        /// Defines what happens when frontend user connects.
        /// </summary>
        /// <returns></returns>
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Defines what happens when frontend user disconnects
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }

        #endregion
    }
}

/// <summary>
/// Represents Base Hub methods for <see cref="Hub{T}"/>.
/// </summary>
public interface IAppClient : IAppLogger, IClientProxy
{
    Task<string> Hello(string message);
    /// <summary>
    /// Invokes the UpdateUserList method to Clients.
    /// </summary>
    /// <param name="onlineUsers">
    /// List of current online Users.
    /// </param>
    /// <returns></returns>
    //Task UpdateUserList(IEnumerable<string> onlineUsers);
}

public interface IAppLogger
{
    string LogClient(string message);
}

public static class AppLoggerExtensions
{
    public static void LogClient(this ILogger logger, IHubCallerClients<IAppClient> clients, string message)
    {
        logger.LogDebug(message);
        clients.All.LogClient(message);
    }
}