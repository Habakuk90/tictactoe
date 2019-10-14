namespace AppHub
{
    /// <summary>
    /// Represents Base Hub methods for <see cref="Hub{T}"/>.
    /// </summary>
    public interface IAppClient
    {
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
}
