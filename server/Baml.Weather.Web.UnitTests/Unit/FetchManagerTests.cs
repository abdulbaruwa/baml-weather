using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Baml.Weather.Web.Config;
using Baml.Weather.Web.Core;
using Baml.Weather.Web.Core.Dtos;
using Baml.Weather.Web.FetchManager;
using Baml.Weather.Web.Infrastructure;
using Baml.Weather.Web.Interfaces;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Baml.Weather.Web.UnitTests.Unit
{
    public class FetchManagerTests
    {
        [Fact]
        public async  Task FetchAndSyncWeather_ReturnsCachedData_WhenCachedVersionIsStillValid()
        {
            var lastFetchTime = DateTimeOffset.Now.AddHours(-2).ToUniversalTime();
            var cacheWeatherOutput =  new WeatherDto() {TimeFetched = lastFetchTime};
;
            // OpenWeather updates are three hours appart
            // Free API's are limited to a number of calls per hour
            // Goal is to create a cache that we only refresh when the data has expired.
            var mockWeatherApi = new Mock<IWeatherApi>();
            mockWeatherApi.Setup(api => api.GetWeatherForLocation(3)).Returns(Task.FromResult(TestDataGenerator.LocationWeather(3)));
            var mockRepo = new Mock<IWeatherRepository>();
            mockRepo.Setup(repo => repo.GetWeatherById(3)).Returns(Task.FromResult(new List<WeatherDto> {cacheWeatherOutput}));
            
            // Act
            var sut = new FetchManager.FetchManager(mockWeatherApi.Object, mockRepo.Object, new OpenWeatherSettings(){CacheExpiryMinutes = 180});
            var result = (await sut.FetchAndSyncWeatherForLocationAsync(3)).FirstOrDefault();

            // Assert
            Assert.NotNull(result);
            Assert.True(result.TimeFetched.Equals(lastFetchTime));
        }

        [Fact]
        public async Task FetchAndSynceWeather_ReturnsNewData_WhenCachedOneHasExpired()
        {
            // Expire cache data, make it older than 4 hours
            var lastFetchTime = DateTimeOffset.Now.AddHours(-4).ToUniversalTime();
            var cacheWeatherOutput = new WeatherDto() { TimeFetched = lastFetchTime } ;
            
            var mockWeatherApi = new Mock<IWeatherApi>();
            mockWeatherApi.Setup(api => api.GetWeatherForLocation(3)).Returns(Task.FromResult(TestDataGenerator.LocationWeather(3)));

            var mockRepo = new Mock<IWeatherRepository>();
            mockRepo.Setup(repo => repo.GetWeatherById(3)).Returns(Task.FromResult(new List<WeatherDto>{ cacheWeatherOutput}));

            // Act
            var sut = new FetchManager.FetchManager(mockWeatherApi.Object, mockRepo.Object, new OpenWeatherSettings(){CacheExpiryMinutes = 180});
            var result = (await sut.FetchAndSyncWeatherForLocationAsync(3)).FirstOrDefault();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(4, (result.TimeFetched - lastFetchTime).Hours);
        }


        [Fact]
        public async Task FetchAndSyncWeather_StoresNewDataInCache_WhenNoneExistsInCache()
        {
            // Expire cache data, by making it older than 4 hours
            var weatherDto = FakerT<WeatherDto>.Generate();
            weatherDto.LocaleId = 3;
            var mockWeatherApi = new Mock<IWeatherApi>();
            mockWeatherApi.Setup(api => api.GetWeatherForLocation(3)).Returns(Task.FromResult(TestDataGenerator.LocationWeather(3)));

            var option = new DbContextOptionsBuilder<WeatherDbContext>().UseInMemoryDatabase("WeatherInMemoryDatabase").Options;
            var dbContext = new WeatherDbContext(option);
            var repository = new WeatherRepository(dbContext);

            // Act
            var sut = new FetchManager.FetchManager(mockWeatherApi.Object, repository, new OpenWeatherSettings() { CacheExpiryMinutes = 180 });
            var result = (await sut.FetchAndSyncWeatherForLocationAsync(3)).FirstOrDefault();

            // Assert
            Assert.Equal(3,result.LocaleId);
            var insertedObject = await repository.GetWeatherById(3);
            Assert.Equal(3, insertedObject.Count);
        }

        public void FetchAndSyncWeather_ReplacesDataInCache_WhenExistingOneHasExpired()
        {
            // TODO
        }


        public async Task FetchAndSyncWeather_ReturnsCachedDataIfAny_WhenThirdPartyCallFails()
        {
            // TODO
        }
    }
}
