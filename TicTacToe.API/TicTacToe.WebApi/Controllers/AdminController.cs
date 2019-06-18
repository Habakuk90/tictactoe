using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TicTacToe.WebApi.TicTacToe.Entities;

namespace TicTacToe.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
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

            foreach (var item in _context.Groups.ToList())
            {
                _context.Groups.Remove(item);
            }

            foreach (var item in _context.UserGroups.ToList())
            {
                _context.UserGroups.Remove(item);
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
