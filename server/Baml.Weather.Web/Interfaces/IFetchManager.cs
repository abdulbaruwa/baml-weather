using System.Collections.Generic;
using System.Threading.Tasks;
using Baml.Weather.Web.Core.Dtos;

namespace Baml.Weather.Web.Interfaces
{
    public interface IFetchManager
    {
        Task<IEnumerable<WeatherDto>> FetchAndSyncWeatherForLocationAsync(int locationId);
    }
}