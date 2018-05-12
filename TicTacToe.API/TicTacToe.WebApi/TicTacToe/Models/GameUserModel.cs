using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Repository;

namespace TicTacToe.WebApi.TicTacToe.Models
{
    public class GameUserModel
    {

        public string Name { get; set; }

        public string CurrentConnectionId { get; set; }

        public ConnectionMapping<string> Connections { get; set; }

        private UserStatus Status { get; set; }
        //For TryGetValue method in Dictionary
        public override bool Equals(object obj)
        {
            if (obj == null || !(obj is GameUserModel)) return false;

            return ((GameUserModel)obj).Name == this.Name;
        }

        public override int GetHashCode()
        {
            return (this.Name).GetHashCode();
        }


        public enum UserStatus
        {
            Online,
            Offline,
            InGame,
            Busy,
            Attention
        }
    }
}
