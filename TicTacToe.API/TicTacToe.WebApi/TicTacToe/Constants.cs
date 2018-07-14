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
            public static readonly string Challenged = "challenged";
            public static readonly string Waiting = "waiting";

        }

        public static class Status
        {
            public static readonly string Online = "Online";
            public static readonly string Offline = "Offline";
            public static readonly string Ingame = "Ingame";

        }
    }
}
