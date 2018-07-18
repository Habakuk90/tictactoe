using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    public class GameUserModel : BaseUserModel
    {

        public ICollection<FriendUserModel> Friends { get; set; }

        [NotMapped]
        public List<string> ConnectionIds { get; set; } = new List<string>();

        [NotMapped]
        public string CurrentConnectionId { get; set; }

        public string GroupName { get; set; }

        public string ConnectionIdsString
        {
            get
            {
                var blob = string.Join(",", this.ConnectionIds);

                return blob;
            }
            set { this.ConnectionIds = value.Split(',').ToList(); }
        }

    }
}

