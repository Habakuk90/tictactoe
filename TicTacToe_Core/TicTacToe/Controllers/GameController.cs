using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe_Core.TicTacToe.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index()
        {
            return View("~/wwwroot/index.html");
        }
    }
}
