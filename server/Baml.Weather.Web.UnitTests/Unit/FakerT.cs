using System;
using System.Collections.Generic;
using System.Linq;
using Bogus;

namespace Baml.Weather.Web.UnitTests.Unit
{
    public  static partial class FakerT<T> where T : class
    {
        public static Faker<T> FakeIt()
        {
            return new Faker<T>().RuleForType(typeof(string), x => Guid.NewGuid().ToString())
                .RuleForType(typeof(DateTimeOffset), x => DateTimeOffset.Now)
                .RuleForType(typeof(decimal), x => x.Random.Decimal())
                .RuleForType(typeof(int), x => x.Random.Int());
        }

        public static T Generate()
        {
            return FakeIt().Generate();
        }

        public static List<T> Generate(int number)
        {
            return FakeIt().Generate(number).ToList();
        }
    }

}