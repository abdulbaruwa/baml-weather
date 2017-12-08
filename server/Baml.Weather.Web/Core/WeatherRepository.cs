using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Baml.Weather.Web.Api;
using Baml.Weather.Web.Core.Dtos;
using Baml.Weather.Web.Core.Models;
using Baml.Weather.Web.Infrastructure;
using Baml.Weather.Web.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Baml.Weather.Web.Core
{
   public class WeatherRepository : IWeatherRepository
    {
        private readonly WeatherDbContext _databaseContext;

        public WeatherRepository(WeatherDbContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public Task<List<Location>> CityListAsyc()
        {
            return _databaseContext.Locations.OrderBy(s => s.name).ToListAsync();
        }

        public Task LoadStaticCityData()
        {
            var cityListPath = Path.Combine(Path.GetDirectoryName(Assembly.GetAssembly(typeof(WeatherController)).Location), @"data\citylist.json");
            var fileReadT = File.ReadAllTextAsync(cityListPath);
            var deserializeT = fileReadT.ContinueWith(antecedent => JsonConvert.DeserializeObject<List<Location>>(fileReadT.Result));
            var addToDbSetT = deserializeT.ContinueWith(antecedent => _databaseContext.Locations.AddRangeAsync(deserializeT.Result),TaskContinuationOptions.OnlyOnRanToCompletion);
            return addToDbSetT.ContinueWith(antecedent => _databaseContext.SaveChangesAsync(), TaskContinuationOptions.OnlyOnRanToCompletion);
        }

        public IQueryable<Location> FindCity(string name)
        {
            return _databaseContext.Locations.Where(x => x.name.StartsWith(name, StringComparison.CurrentCultureIgnoreCase));
        }

        public Task<List<WeatherDto>> GetWeatherById(int locationId)
        {
            var cache = _databaseContext.WeatherCache.FirstOrDefault(x => x.LocaleId == locationId);

            if (cache == null) return Task.FromResult(new List<WeatherDto>());
            var weatherDtoList = JsonConvert.DeserializeObject<List<WeatherDto>>(cache.Json);
            return Task.FromResult(weatherDtoList);
        }

        public Task UpsertWeatherDtoAsync(List<WeatherDto> weatherDtos)
        {
            if (! weatherDtos.Any()) return Task.CompletedTask;
            var localeId = weatherDtos.First().LocaleId;

            var entity = _databaseContext.WeatherCache.FirstOrDefault(x => x.LocaleId == localeId);
            if (entity != null)
            {
                entity.Json = JsonConvert.SerializeObject(weatherDtos);
                _databaseContext.WeatherCache.Update(entity);
            }
            else
            {
                var newEntity = new WeatherCache()
                {
                    LocaleId = localeId,
                    Json = JsonConvert.SerializeObject(weatherDtos)
                };
                _databaseContext.WeatherCache.Add(newEntity);
            }
            return _databaseContext.SaveChangesAsync();
        }
    }
}