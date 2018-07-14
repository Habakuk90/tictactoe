using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    [NotMapped]
    public class FriendUserModel : BaseUserModel
    {
        public ICollection<Statistic> Statistics { get; set; }
    }
}
