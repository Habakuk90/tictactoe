using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    public class GameUserModel
    {
        public string Name { get; set; }

        public IEnumerable<string> ConnectionIds { get; set; }

        public IEnumerable<string> Groups { get; set; }
    }
}
