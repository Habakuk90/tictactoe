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
        public List<string> ConnectionIds { get; set; }

        [NotMapped]
        public ICollection<string> Groups { get; set; }


        [Column("ConnectionIds")]
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
