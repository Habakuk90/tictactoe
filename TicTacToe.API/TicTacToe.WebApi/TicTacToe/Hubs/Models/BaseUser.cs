namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using global::TicTacToe.WebApi.TicTacToe.Entities;

    /// <summary>
    /// Represents a base user.
    /// </summary>
    public class BaseUser : BaseEntity
    {
        public string Status { get; set; }

        public bool IsAnonymous { get; set; }

        public IList<UserGroups> UserGroups { get; set; }

        [NotMapped]
        public List<string> ConnectionIds
        {
            get;
            set;
        } = new List<string>();

        [NotMapped]
        public string CurrentConnectionId { get; set; }

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
