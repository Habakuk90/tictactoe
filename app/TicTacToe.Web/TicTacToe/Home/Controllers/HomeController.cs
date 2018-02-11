using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.Web.TicTacToe.Home.Controllers
{
    public class HomeController : Controller
    {

        public IActionResult Index()
        {
            return View("~/TicTacToe/Home/Views/Index.cshtml");
        }
    }
}
