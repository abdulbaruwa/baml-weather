namespace Baml.Weather.Web.Core.Dtos
{
    public class WeatherDto
    {
        public string WeatherDay { get; set; }
        public string Locale { get; set; }
        public int LocaleId { get; set; }
        public TimedWeatherDetail[] TimedWeatherDetail { get; set; }
    }
}