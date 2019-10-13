

namespace GameHub
{

    using System;
    using System.IO;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile(
                    $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"}.json",
                    optional: true)
                .AddEnvironmentVariables()
                .Build();
        }

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
                    builder => builder.WithOrigins("https://ttt-app.azurewebsites.net")
                                        .AllowAnyMethod()
                                        .AllowAnyHeader()
                                        .AllowCredentials());
            });

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("LocalCorsPolicy");

            }
            app.UseCors("LocalCorsPolicy");
            app.UseSignalR(routes =>
            {
                routes.MapHub<GameHub>("/gameh");
            });
            app.Run(async (context) =>
            {
                //await context.Response.WriteAsync("Hello World!");

                //FIXME: LOGGER HERE plese
            });
        }
    }
}
