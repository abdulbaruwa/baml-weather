using System;
using System.Collections.Generic;
using System.Linq;
using Baml.Weather.Web.Core.Dtos;
using Baml.Weather.Web.Core.Models;

namespace Baml.Weather.Web
{
    public static class Extensions
    {
        public static List<WeatherDto> ToWeatherDtoList(this LocationWeather locationWeather)
        {
            if(locationWeather.list == null)return new List<WeatherDto>();
            var grouped = locationWeather.list.GroupBy(n => n.Day);
            var weatherDtos = new List<WeatherDto>();
            var locale = locationWeather.city.name;
            var localeId = locationWeather.city.id;
            foreach (var list in grouped)
            {
                var rootItem = list.First();
                var weatherDto = new WeatherDto
                {
                    WeatherDay = rootItem.Day.ToShortDateString(),
                    Locale = locale,
                    LocaleId = localeId,
                    TimeFetched = DateTimeOffset.Now
                };

                var details = list.Select(x => new TimedWeatherDetail()
                {
                    Temperature = x.main.temp,
                    Humidity = x.main?.humidity,
                    Wind = x.wind?.speed,
                    WindDirection = x.wind?.deg,
                    ShortDescription = x.weather?.FirstOrDefault()?.description,
                    DayTime = x.DateTimeOffset,
                    Precipitation = x.snow?.ThreeHourVolume,

                }).ToArray();

                weatherDto.TimedWeatherDetail = details;
                weatherDtos.Add(weatherDto);
            }

            return weatherDtos;
        }
    }
}