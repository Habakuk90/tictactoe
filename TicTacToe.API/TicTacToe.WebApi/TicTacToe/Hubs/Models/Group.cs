namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    using System.Collections.Generic;
    using global::TicTacToe.WebApi.TicTacToe.Entities;

    public class Group : Entity
    {
        /// <summary>
        /// Gets or sets the type of the Group.
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Gets or sets the UserGroups in a many to many relation between
        /// <see cref="User"/> and <see cref="Group"/>
        /// </summary>
        public IList<UserGroups> UserGroups { get; set; } = new List<UserGroups>();
    }
}
