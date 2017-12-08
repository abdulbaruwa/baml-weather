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
        public DbSet<WeatherDto> Weathers { get; set; }
        public DbSet<WeatherCache> WeatherCache { get; set; }
        public DbSet<TimedWeatherDetail> TimedWeatherDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Location>().ToTable("Location");
            modelBuilder.Entity<WeatherDto>().ToTable("Weather");
            modelBuilder.Entity<TimedWeatherDetail>().ToTable("TimeWeatherDetail");

            modelBuilder.Entity<WeatherDto>().HasKey(x => x.LocaleId);
            modelBuilder.Entity<WeatherCache>().HasKey(x => x.LocaleId);
            modelBuilder.Entity<TimedWeatherDetail>().HasKey(x => x.Id);
            modelBuilder.Entity<WeatherDto>().HasMany(x => x.TimedWeatherDetail);
        }
     
    }
}