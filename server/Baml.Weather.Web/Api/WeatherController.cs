using System.Collections.Generic;
using System.Threading.Tasks;
using Baml.Weather.Web.Core.Dtos;
using Baml.Weather.Web.Core.Models;
using Baml.Weather.Web.FetchManager;
using Baml.Weather.Web.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Baml.Weather.Web.Api
{
    [Route("api/weather")]
    public class WeatherController : Controller
    {
        private readonly IFetchManager _fetchManager;
        private readonly IWeatherRepository _weatherRepository;

        public WeatherController(IFetchManager fetchManager, IWeatherRepository weatherRepository)
        {
            _fetchManager = fetchManager;
            _weatherRepository = weatherRepository;
        }

        [HttpGet("getbylocation/{locationId}")]
        public Task<IEnumerable<WeatherDto>> GetByLocation(int locationId)
        {
            return _fetchManager.FetchAndSyncWeatherForLocationAsync(locationId);
        }

        [HttpGet("searchlocation/{location}")]
        public  Task<List<Location>> SearchLocation(string location)
        {
            return _weatherRepository.FindCity(location).ToListAsync();
        }

        //[HttpGet("search")]
        //public async Task Search()
        //{
        //    var c = await _weatherRepository.CityListAsyc();
        //    await _weatherRepository.LoadStaticCityData();
        //    var y = await _weatherRepository.CityListAsyc();
        //}
    }
}