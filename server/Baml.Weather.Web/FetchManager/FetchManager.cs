﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Baml.Weather.Web.Config;
using Baml.Weather.Web.Core.Dtos;
using Baml.Weather.Web.Interfaces;

namespace Baml.Weather.Web.FetchManager
{
    public class FetchManager : IFetchManager
    {
        private readonly IWeatherApi _weatherApi;
        private readonly IWeatherRepository _repository;
        private readonly OpenWeatherSettings _openWeatherSettings;

        public FetchManager(IWeatherApi weatherApi, IWeatherRepository repository, OpenWeatherSettings openWeatherSettings)
        {
            _weatherApi = weatherApi;
            _repository = repository;
            _openWeatherSettings = openWeatherSettings;
        }

        public async Task<IEnumerable<WeatherDto>> FetchAndSyncWeatherForLocationAsync(int locationId)
        {
            // Return the the unexpired cached weather entity if any
            var cachedWeather = await _repository.GetWeatherById(locationId);
            if (cachedWeather.Any(x => (DateTimeOffset.UtcNow - x.TimeFetched).TotalMinutes <= _openWeatherSettings.CacheExpiryMinutes))
            {
                return cachedWeather;
            }

            var locationWeather = await _weatherApi.GetWeatherForLocation(locationId);
            var weatherDtos = locationWeather.ToWeatherDtoList();
            if (weatherDtos.Any())
            {
                await _repository.UpsertWeatherDtoAsync(weatherDtos);
            }
            return weatherDtos;
        }
    }
}