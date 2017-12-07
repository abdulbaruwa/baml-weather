using System.Threading.Tasks;
using Refit;

namespace Baml.Weather.Web.Interfaces
{
    public interface IRestFullOpenWeatherMapApi
    {
        // http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1
        [Get("/forecast?id={locationId}&appid={appId}")]
        Task<string> GetMap(int locationId, string appId);
    }
}