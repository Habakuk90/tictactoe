using System;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    public class Statistic
    {
        public int ID { get; set; }

        public string Game { get; set; }

        public int Win { get; set; }

        public int Lose { get; set; }
    }
}