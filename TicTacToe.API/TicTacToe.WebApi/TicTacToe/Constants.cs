using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe
{
    public class Constants
    {
        public static class ModalStatus
        {
            public static readonly string CHALLENGED = "challenged";
            public static readonly string WAITING = "waiting";

        }

        public static class Status
        {
            public static readonly string ONLINE = "Online";
            public static readonly string OFFLINE = "Offline";
            public static readonly string INGAME = "Ingame";
        }

        public static class GameName
        {
            public static readonly string TICTACTOE = "tictactoe";
        }
    }
}
