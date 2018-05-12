using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TicTacToe.WebApi.TicTacToe.Entities;
using Microsoft.AspNetCore.Cors;
using TicTacToe.WebApi.TicTacToe.Hubs;
using Microsoft.Extensions.Primitives;

namespace TicTacToe.WebApi
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
            // ===== Add Policy ========
            services.AddCors(options => options.AddPolicy("LocalCorsPolicy",
                builder =>
                {
                    builder.AllowAnyMethod().AllowAnyHeader().AllowCredentials()
                           .AllowAnyOrigin();
                }));
            // DB Connection DefaultConnection to be found in launchsettings.json
            // ===== Add our DbContext ========
            services.AddDbContext<AppDbContext>(options =>
                options
                    .UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // ===== Add Identity ========
            services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 7;
            }).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();

            // ===== Add JWT Authentication ========
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            if (context.Request.Path.Value.StartsWith("/signalR") &&
                    context.Request.Query.TryGetValue("token", out StringValues token))
                            {
                                context.Token = token;
                            }

                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            var te = context.Exception;
                            return Task.CompletedTask;
                        }
                    };
                });
            services.AddMvc();
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            AppDbContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("LocalCorsPolicy");

            // JWT Bearer Token Authentication
            app.UseAuthentication();

            app.UseSignalR(routes => routes.MapHub<GameHub>("/api/signalR"));

            app.UseMvc();

            // ===== Create tables ======
            dbContext.Database.EnsureCreated();
        }
    }
}
