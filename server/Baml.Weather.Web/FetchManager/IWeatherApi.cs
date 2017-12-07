using System.Threading.Tasks;
using Baml.Weather.Web.Config;
using Baml.Weather.Web.Core.Models;
using Baml.Weather.Web.Interfaces;
using Newtonsoft.Json;
using Refit;

namespace Baml.Weather.Web.FetchManager
{
    public interface IWeatherApi
    {
        Task<LocationWeather> GetWeatherForLocation(int locationId);
    }

    class WeatherApi : IWeatherApi
    {
        private readonly OpenWeatherSettings _openWeatherSettings;

        public WeatherApi(OpenWeatherSettings openWeatherSettings)
        {
            _openWeatherSettings = openWeatherSettings;
        }

        public Task<LocationWeather> GetWeatherForLocation(int locationId)
        {
            // Task to make Third Party API call
            var jsonT = RestService.For<IRestFullOpenWeatherMapApi>(_openWeatherSettings.Url).GetMap(locationId, _openWeatherSettings.Key);

            // The antecedent task to deserialize the result.
            return jsonT.ContinueWith(antecedent => JsonConvert.DeserializeObject<LocationWeather>(antecedent.Result), TaskContinuationOptions.OnlyOnRanToCompletion);
        }
    }
}