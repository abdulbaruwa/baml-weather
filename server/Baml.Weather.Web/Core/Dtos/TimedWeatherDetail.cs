using System;

namespace Baml.Weather.Web.Core.Dtos
{
    public class TimedWeatherDetail
    {
        public string Day { get; set; }
        public double Temperature { get; set; }
        public double Wind { get; set; }
        public double WindDirection { get; set; }
        public int Humidity { get; set; }
        public string ShortDescription { get; set; }
        public DateTimeOffset DayTime { get; set; }
        public double Precipitation { get; set; }
        public int Hour => DayTime.Hour;
    }
}