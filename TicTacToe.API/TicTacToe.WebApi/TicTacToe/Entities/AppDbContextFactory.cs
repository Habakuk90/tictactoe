using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TicTacToe.WebApi.TicTacToe.Entities
{

    public class AppDbContextFactory : IAppDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer(this.GetConnectionString());

            return new AppDbContext(optionsBuilder.Options);
        }

        private IConfiguration CreateConfig()
        {
            IConfiguration config =
                new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile(
                    $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"}.json",
                    optional: true)
                .AddEnvironmentVariables()
                .Build();


            return config;
        }

        private string GetConnectionString()
        {
            return this.CreateConfig().GetConnectionString("DefaultConnection");
        }
    }
}
