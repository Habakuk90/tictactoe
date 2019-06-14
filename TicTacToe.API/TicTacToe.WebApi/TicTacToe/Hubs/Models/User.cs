namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using global::TicTacToe.WebApi.TicTacToe.Entities;

    /// <summary>
    /// Represents a base user.
    /// </summary>
    public class User : Entity
    {
        /// <summary>
        /// gets/sets the availability status of the user.
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// gets/sets f the user is anonymous.
        /// </summary>
        public bool IsAnonymous { get; set; }


        /// <summary>
        /// Gets or sets the UserGroups in a many to many relation between
        /// <see cref="User"/> and <see cref="Group"/>
        /// </summary>
        public IList<UserGroups> UserGroups { get; set; }

        /// <summary>
        /// A list of the connections Ids of the user.
        /// </summary>
        [NotMapped]
        public List<string> ConnectionIds
        {
            get;
            set;
        } = new List<string>();

        /// <summary>
        /// gets/sets the current connection ID of the user.
        /// </summary>
        [NotMapped]
        public string CurrentConnectionId { get; set; }

        /// <summary>
        /// gets sets the Connectionid list as String, mainly for database.
        /// </summary>
        public string ConnectionIdsString
        {
            get
            {
                string blob = string.Join(",", this.ConnectionIds);

                return blob;
            }
            set { this.ConnectionIds = value.Split(',').Distinct().ToList(); }
        }
    }
}
