using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TicTacToe.WebApi.TicTacToe.Entities;

namespace TicTacToe.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private AppDbContext _context;

        public AdminController()
        {
            _context = new AppDbContextFactory().CreateDbContext();
        }

        [HttpGet]
        public JsonResult Index()
        {
            var x = _context.AppUser.ToList();
            
            return Json(x);
        }

        [Route("reset")]
        [HttpGet]
        public JsonResult Reset()
        {

            foreach (var x in _context.AppUser.ToList())
            {
                _context.AppUser.Remove(x);
            }
            _context.SaveChanges();

            return Json("success");
        }

        [Route("userExists")]
        [HttpGet]
        public JsonResult UserExists(string name)
        {
            return Json(_context.Users.Any(x => x.UserName == name) || _context.AppUser.Any(x => x.Name == name));
        }
    }

}
