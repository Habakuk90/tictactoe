using System;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    /// <summary>
    /// Represents a base DB Entity.
    /// </summary>
    public class Entity
    {
        /// <summary>
        /// Gets/sets ID of the Entity.
        /// </summary>
        public Guid ID { get; set; }


        /// <summary>
        /// Gets/sets Name of the Entity.
        /// </summary>
        public string Name { get; set; }
    }
}
