using TicTacToe.WebApi.TicTacToe.Authentication.Models;
using TicTacToe.WebApi.TicTacToe.Authentication.Repository;

namespace TicTacToe.WebApi.TicTacToe.Authentication.Controllers
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using System.Threading.Tasks;
    /// <summary>
    /// Represents the AccountController
    /// </summary>
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        #region Private readonly properties

        /// <summary>
        /// SigninManager where T is <see cref="IdentityUser"/>
        /// </summary>
        private readonly SignInManager<IdentityUser> _signInManager;

        /// <summary>
        /// UserManager where T is <see cref="IdentityUser"/>
        /// </summary>
        private readonly UserManager<IdentityUser> _userManager;

        /// <summary>
        /// App Configuration
        /// </summary>
        private readonly IConfiguration _configuration;

        #endregion

        #region Public methods

        /// <summary>
        /// Set SignInManager and UserManager through Dependency Injection
        /// </summary>
        /// <param name="signInManager"></param>
        /// <param name="userManager"></param>
        public AccountController(SignInManager<IdentityUser> signInManager,
                              UserManager<IdentityUser> userManager,
                              IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        /// <summary>
        /// Register User with UserManager
        /// </summary>
        /// <param name="registerModel">
        /// User Data for the registration Process <see cref="RegisterModel"/>
        /// </param>
        /// <returns></returns>
        public async Task<IActionResult> RegisterUser([FromBody]RegisterModel registerModel)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = registerModel.UserName,
            };

            IdentityResult result = await _userManager
                .CreateAsync(user, registerModel.Password);

            if (!result.Succeeded)
            {
                return new BadRequestObjectResult(
                    Errors.AddErrorsToModelState(result, ModelState));
            }

            await _signInManager.SignInAsync(user, false);
            string jwtToken = Tokens
                .GenerateJwtToken(user.UserName, user, _configuration);

            return new OkObjectResult(jwtToken);
        }

        /// <summary>
        /// Login User with SignInManager
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<IActionResult> LoginUser([FromBody]LoginModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager
                .PasswordSignInAsync(user.UserName, user.Password, false, false);

            if (!result.Succeeded)
            {
                return BadRequest(Errors.AddErrorToModelState(
                    "login_failure", "Invalid username or password.", ModelState));
            }

            IdentityUser appUser = await _userManager.FindByNameAsync(user.UserName);
            string jwtToken = Tokens.GenerateJwtToken(user.UserName, appUser, _configuration);

            return new OkObjectResult(jwtToken);
        }


        /// <summary>
        /// Logs Out User with SignInManager
        /// </summary>
        public async void LogoutUser()
        {
            await _signInManager.SignOutAsync();
        }

        #endregion

    }

}
