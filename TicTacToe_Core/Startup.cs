using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TicTacToe_Core.TicTacToe.Data;
using Microsoft.EntityFrameworkCore;
using TicTacToe_Core.TicTacToe.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace TicTacToe_Core
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string PagesFolder = "/TicTacToe/Pages";


            services.AddDbContext<UserDbContext>(options =>
                options
                    .UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<UserModel, IdentityRole>()
                    .AddEntityFrameworkStores<UserDbContext>()
                    .AddDefaultTokenProviders();

            services.AddMvc().AddRazorPagesOptions(options =>
            {
                options.Conventions.AuthorizeFolder("/Account/Manage");
                options.Conventions.AuthorizePage("/Account/Logout");
                options.Conventions.AddFolderRouteModelConvention(PagesFolder, model =>
                {
                    var selectorCount = model.Selectors.Count;
                    {
                        for (var i = 0; i < selectorCount; i++)
                        {
                            var selector = model.Selectors[i];
                            model.Selectors.Add(new SelectorModel
                            {
                                AttributeRouteModel = new AttributeRouteModel
                                {
                                    Order = 1,
                                    Template = AttributeRouteModel.CombineTemplates(
                                        selector.AttributeRouteModel.Template,
                                        "{PagesTemplate?}"),
                                }
                            });
                        }
                    }
                });
            });


            services.AddCors();
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseCors(builder => builder.AllowAnyOrigin()
                                          .AllowAnyMethod()
                                          .AllowAnyHeader());

            app.UseSignalR(routes => routes.MapHub<HitCounterHub>("hitCounter"));

            app.UseMvc(routes => routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}"));
        }
    }
}
