using System.Collections.Generic;
using System.Threading.Tasks;
using Baml.Weather.Web.Core.Dtos;
using Baml.Weather.Web.Interfaces;

namespace Baml.Weather.Web.FetchManager
{
    public class FetchManager : IFetchManager
    {
        private readonly IWeatherApi _weatherApi;

        public FetchManager(IWeatherApi weatherApi)
        {
            _weatherApi = weatherApi;
        }

        public async Task<IEnumerable<WeatherDto>> FetchAndSyncWeatherForLocationAsync(int locationId)
        {
            var locationWeather = await _weatherApi.GetWeatherForLocation(locationId);
            var weatherDtos = locationWeather.ToWeatherDtoList();
            return weatherDtos;
        }
    }
}