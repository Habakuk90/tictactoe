using System;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    /// <summary>
    /// Represents the many to many of <see cref="Group"/> and <see cref="User"/>
    /// </summary>
    public class UserGroups
    {
        /// <summary>
        /// gets/sets the userId.
        /// </summary>
        public Guid UserId { get; set; }
        /// <summary>
        /// gets/sets the User.
        /// </summary>
        public User User { get; set; }

        /// <summary>
        /// gets/sets the group id-
        /// </summary>
        public Guid GroupId { get; set; }
        /// <summary>
        /// gets/sets the group.
        /// </summary>
        public Group Group { get; set; }
    }
}
