

export class WeatherForecast {
    weatherDay: string;
    locale: string;
    localeId: number;
    timedWeatherDetail: TimedWeatherDetail[]
 }

export class TimedWeatherDetail{
    temperature: number;
    wind: number;
    windDirection: number;
    humidity: number
    shortDescription: string;
    dayTime: string;
    precipitation: number; 
    hour: number;
}

export class ForecastLocation{
    name: string;
    id: number;
    country: string;
}
