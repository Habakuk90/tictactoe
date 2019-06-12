using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> AppUser { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<UserGroups> UserGroups { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // configures one-to-many relationship
            builder.Entity<UserGroups>().HasKey(ug => new { ug.GroupId, ug.UserId });

            builder.Entity<UserGroups>()
                .HasOne<User>(x => x.User)
                .WithMany(s => s.UserGroups)
                .HasForeignKey(x => x.GroupId);

            builder.Entity<UserGroups>()
                .HasOne<Group>(g => g.Group)
                .WithMany(ug => ug.UserGroups)
                .HasForeignKey(x => x.UserId);

            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
