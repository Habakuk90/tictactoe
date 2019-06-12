namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using global::TicTacToe.WebApi.TicTacToe.Entities;

    public class Group : Entity
    {
        public string Type { get; set; }

        public IList<UserGroups> UserGroups { get; set; }
    }
}
