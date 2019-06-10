using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    public class BaseEntity
    {
        public Guid ID { get; set; }

        public string Name { get; set; }
    }
}
