using System;
using System.Linq;
using System.Threading.Tasks;
using Baml.Weather.Web.Config;
using Baml.Weather.Web.Core;
using Baml.Weather.Web.FetchManager;
using Baml.Weather.Web.Infrastructure;
using Baml.Weather.Web.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Baml.Weather.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            var appConfig = Configuration.Get<AppSettings>();
            services.AddScoped<OpenWeatherSettings>(cfg => appConfig.OpenWeatherSettings);
            services.AddScoped<IFetchManager, FetchManager.FetchManager>();
            services.AddScoped<IWeatherApi, WeatherApi>();
            services.AddScoped<IWeatherRepository, WeatherRepository>();

            services.AddDbContext<WeatherDbContext>(option => option.UseInMemoryDatabase("WeatherInMemoryDatabase"));

            services.AddCors();
            services.AddMvc();
            return services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                var weatherRepository = app.ApplicationServices.GetService<IWeatherRepository>();
                InitDatabaseAsync(weatherRepository).Wait();
            }
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader());
            app.UseMvc();
        }

        private async Task InitDatabaseAsync(IWeatherRepository weatherRepository)
        {
            var cites = await weatherRepository.CityListAsyc();
            if (!cites.Any())
            {
                await weatherRepository.LoadStaticCityData();
            }
        }
    }
}
