using System;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    public class UserGroups
    {
        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid GroupId { get; set; }
        public Group Group { get; set; }
    }
}
