using System.Threading.Tasks;
using Baml.Weather.Web.Core.Models;

namespace Baml.Weather.Web.FetchManager
{
    public interface IWeatherApi
    {
        Task<LocationWeather> GetWeatherForLocation(int locationId);
    }

}