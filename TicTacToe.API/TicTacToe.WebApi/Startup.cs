using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Repository;

namespace TicTacToe.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile(
                    $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"}.json",
                    optional: true)
                .Build();

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // ===== Add Policy ========
            services.AddCors(options =>
                {
                    options.AddPolicy("LocalCorsPolicy",
                        builder => builder.WithOrigins("http://localhost:4200")
                                            .AllowAnyMethod()
                                            .AllowAnyHeader()
                                            .AllowCredentials());

                    options.AddPolicy("ProdCorsPolicy",
                        builder => builder.WithOrigins("http://app.andkra.eu")
                                            .AllowAnyMethod()
                                            .AllowAnyHeader()
                                            .AllowCredentials());
                });
            // DB Connection DefaultConnection to be found in appsettings.json
            // ===== Add our DbContext ========
            services.AddDbContext<AppDbContext>(options =>
                options
                    .UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // ===== Add Identity ========
            services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 5;
            }).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
            
            // ===== Add JWT Authentication ======== //
            // Workaround for apsnetcore.signalR need to send token via request
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
                            // enables authorization for the websocket via token
                            if (context.Request.Path.Value.StartsWith("/api/signalR") &&
                    context.Request.Query.TryGetValue("token", out StringValues token))
                            {
                                context.Token = token;
                            }

                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            Exception te = context.Exception;
                            return Task.CompletedTask;
                        }
                    };
                });
            services.AddMvc();
            services.AddSignalR();
            services.AddTransient<IGameUserService, GameUserService>();
            services.AddTransient<IGroupService, GroupService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            AppDbContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("LocalCorsPolicy");

            }
            else
            {
                // TODO: Test Production
                app.UseCors("ProdCorsPolicy");
            }

            // JWT Bearer Token Authentication
            app.UseAuthentication();

            app.UseSignalR(routes => routes.MapHub<GameHub>("/api/signalR"));

            app.UseMvc();

            // ===== Create tables ======
            dbContext.Database.EnsureCreated();
        }
    }
}
