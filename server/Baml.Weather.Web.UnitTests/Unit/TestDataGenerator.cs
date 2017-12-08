using System;
using System.Linq;
using Baml.Weather.Web.Core.Models;
using Bogus;

namespace Baml.Weather.Web.UnitTests.Unit
{
    public static class TestDataGenerator
    {
        public static LocationWeather LocationWeather(int cityId)
        {
            // var xx = new Faker<City>().RuleForType(typeof(string), x => Guid.NewGuid().ToString()).Generate();
            Randomizer.Seed = new Random(8675309);
            var city = FakerT<City>.FakeIt().Generate();
            city.id = cityId;
            var main = FakerT<Main>.FakeIt();
            var wind = FakerT<Wind>.FakeIt();
            var snow = FakerT<Snow>.FakeIt();
            var clouds = FakerT<Clouds>.FakeIt();
            var weather = FakerT<Core.Models.Weather>.FakeIt();

            var list = FakerT<List>.FakeIt()
                .RuleFor(f => f.main, x => main.Generate())
                .RuleFor(f => f.wind, x => wind.Generate())
                .RuleFor(f => f.snow, x => snow.Generate())
                .RuleFor(f => f.weather, x => weather.Generate(1).ToList())
                .RuleFor(f => f.clouds, x => clouds.Generate());

            var locationWeather = new Faker<LocationWeather>()

                .RuleFor(f => f.city, c => city)
                .RuleFor(f => f.list, l => list.Generate(3).ToList());
            return locationWeather.Generate();
        }
    }
}