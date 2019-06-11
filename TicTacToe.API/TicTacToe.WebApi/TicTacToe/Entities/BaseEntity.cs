using System;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    public class BaseEntity
    {
        public Guid ID { get; set; }

        public string Name { get; set; }
    }
}
