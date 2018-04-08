using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.Web.TicTacToe.Game.Models
{
    public class RoomModel
    {
        [Key]
        public int RoomId { get; set; }
        public string RoomName { get; set; }

        public List<GameUserModel> UserInRoom { get; set; }
    }
}
