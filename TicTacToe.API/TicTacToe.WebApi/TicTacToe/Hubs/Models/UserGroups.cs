using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    public class UserGroups
    {
        public Guid UserId { get; set; }
        public BaseUser User { get; set; }

        public Guid GroupId { get; set; }
        public BaseGroup Group { get; set; }
    }
}
