using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    public class TicTacToeHub
    {
        public string TestHub(string message)
        {
            return message;
        }

    }
}
