using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Baml.Weather.Web.Core.Dtos;
using Baml.Weather.Web.Core.Models;

namespace Baml.Weather.Web.Interfaces
{
    public interface IWeatherRepository
    {
        Task<List<Location>> CityListAsyc();
        Task LoadStaticCityData();
        IQueryable<Location> FindCity(string name);
        Task<List<WeatherDto>> GetWeatherById(int locationId);
        Task UpsertWeatherDtoAsync(List<WeatherDto> weatherDtos);
    }
}