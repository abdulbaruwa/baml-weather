using Baml.Weather.Web.Core.Dtos;
using Baml.Weather.Web.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;

namespace Baml.Weather.Web.Infrastructure
{
    public class WeatherDbContext : DbContext
    {
        public WeatherDbContext(DbContextOptions<WeatherDbContext> options) : base(options)
        {
        }
        public DbSet<Location> Locations { get; set; }
        public DbSet<WeatherCache> WeatherCache { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Location>().ToTable("Location");
            modelBuilder.Entity<WeatherCache>().HasKey(x => x.LocaleId);
        }
    }
}