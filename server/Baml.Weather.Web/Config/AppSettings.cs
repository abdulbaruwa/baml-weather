namespace Baml.Weather.Web.Config
{
    public class LogLevel
    {
        public string Default { get; set; }
    }

    public class Debug
    {
        public LogLevel LogLevel { get; set; }
    }
    
    public class Console
    {
        public LogLevel LogLevel { get; set; }
    }

    public class Logging
    {
        public bool IncludeScopes { get; set; }
        public Debug Debug { get; set; }
        public Console Console { get; set; }
    }

    public class OpenWeatherSettings
    {
        public string Key { get; set; }
        public string Url { get; set; }
        public int CacheExpiryMinutes { get; set; }
    }

    public class AppSettings
    {
        public Logging Logging { get; set; }
        public OpenWeatherSettings OpenWeatherSettings { get; set; }
    }

}