using System.ComponentModel.DataAnnotations;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    public class BaseUserModel
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public string Status { get; set; }

    }
}
