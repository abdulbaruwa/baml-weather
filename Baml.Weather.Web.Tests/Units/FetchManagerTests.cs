using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Baml.Weather.Web.Core.Dtos;
using Baml.Weather.Web.Core.Models;
using Baml.Weather.Web.FetchManager;
using Baml.Weather.Web.Interfaces;
using Bogus;
using Moq;
using Xunit;

namespace Baml.Weather.Web.Tests.Units
{
    public class FetchManagerTests
    {
        [Fact]
        public async Task FetchAndSyncWeather_ReturnsCachedData_WhenCachedVersionIsStillValid()
        {

            var lastFetchTime = DateTimeOffset.Now.AddHours(-2).ToUniversalTime();
            var cacheWeatherOutput = new List<WeatherDto>() { new WeatherDto() { TimeFetched = lastFetchTime } };
            ;
            // OpenWeather updates are three hours appart
            // Free API's are limited to a number of calls per hour
            // Goal is to create a cache that we only refresh when the data has expired.
            var mockWeatherApi = new Mock<IWeatherApi>();
            mockWeatherApi.Setup(api => api.GetWeatherForLocation(3)).Returns(Task.FromResult(TestDataGenerator.LocationWeather(3)));

            var mockRepo = new Mock<IWeatherRepository>();

            mockRepo.Setup(repo => repo.GetWeatherById(3)).Returns(cacheWeatherOutput.AsQueryable());

            var sut = new FetchManager.FetchManager(mockWeatherApi.Object);

            var result = (await sut.FetchAndSyncWeatherForLocationAsync(3)).FirstOrDefault();

            Assert.NotNull(result);
            Assert.True(result.TimeFetched.Equals(lastFetchTime));
        }

        public void FetchAndSyncWeather_ReturnsCachedDataIfAny_WhenThirdPartyCallFails()
        {

        }

        public void FetchAndSynceWeather_ReturnsNewData_WhenCachedOneHasExpired()
        {

        }

        public void FetchAndSyncWeather_StoresNewDataInCache_WhenNoneExistsInCache()
        {


        }

        public void FetchAndSyncWeather_ReplacesDataInCache_WhenExistingOneHasExpired()
        {

        }

    }

    public static class FakerT<T> where T : class
    {
        public static Faker<T> FakeIt()
        {
            return new Faker<T>().RuleForType(typeof(string), x => Guid.NewGuid().ToString())
                .RuleForType(typeof(DateTimeOffset), x => DateTimeOffset.Now)
                .RuleForType(typeof(decimal), x => x.Random.Decimal())
                .RuleForType(typeof(int), x => x.Random.Int());
        }
    }
    public static class TestDataGenerator
    {

        public static LocationWeather LocationWeather(int cityId)
        {
            Randomizer.Seed = new Random(8675309);
            var city = FakerT<City>.FakeIt();
            var main = FakerT<Main>.FakeIt();
            var wind = FakerT<Wind>.FakeIt();
            var snow = FakerT<Snow>.FakeIt();
            var clouds = FakerT<Clouds>.FakeIt();
            var weather = FakerT<Core.Models.Weather>.FakeIt();

            var list = FakerT<List>.FakeIt()
                .RuleFor(f => f.main, x => main.Generate())
                .RuleFor(f => f.wind, x => wind.Generate())
                .RuleFor(f => f.snow, x => snow.Generate())
                .RuleFor(f => f.weather, x => weather.Generate(3).ToList())
                .RuleFor(f => f.clouds, x => clouds.Generate());

            var locationWeather = new Faker<LocationWeather>()
                .RuleFor(f => f.city, c => city.Generate())
                .RuleFor(f => f.list, l => list.Generate(3).ToList());
            return locationWeather.Generate();
        }
    }
}
