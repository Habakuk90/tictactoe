//using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe_Core.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //return "STANDARD WTF";
            //return View("~/TicTacToe/Views/Index.cshtml");
            return View("~/TicTacToe/Views/Index.cshtml");

        }
    }
}
