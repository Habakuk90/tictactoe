using System.ComponentModel.DataAnnotations;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    /// <summary>
    /// Represents a base user.
    /// </summary>
    public class BaseUserModel
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public string Status { get; set; }

    }
}
