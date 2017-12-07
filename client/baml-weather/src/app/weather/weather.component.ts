import { Component, OnInit } from '@angular/core';
import { Weather, DayWeather, TimedWeatherDetail, WeatherLocation } from '../models/weather';
import { WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Bring in Reactive extension namespaces
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// import { MatSlideToggleChange } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService]

})
export class WeatherComponent implements OnInit {
  locales: Observable<WeatherLocation[]>
  private searchTerms = new Subject<string>()
  hourSelected: number = 0;
  fiveDayWeather: DayWeather[] = [];
  fiveDayReportArray: Weather[] = [];
  selectedTabIndex: number = 0;
  tempUnitIsCelsius: boolean = true;
  tempUnitText: string = "Celsius";
  tempUnitSuffix = "°C"
  date = "03 Decmber 2017"
  currentDayWeather: TimedWeatherDetail;
  lastUpdate: string;
  selectedLocation: WeatherLocation;

  onLocationChange(event) {
    if (event == undefined) return;
    if (!event.source.selected) return;
    this.selectedLocation = event.source;
    console.log(event.source.value);
    
    this.getWeatherForecast(this.selectedLocation.localeId)
  }

  onTabChange(event) {
    if (event == undefined) return;
    if (event.index == undefined) return;
    this.setCurrentDayWeatherEntity(event.index, this.hourSelected)
  }

  onTimeSlideChange(event) {
    if (event == undefined) return;
    this.setCurrentDayWeatherEntity(this.selectedTabIndex, this.hourSelected)
  }

  onSlideChange(event) {
    if (event == undefined) return;
    if (event.checked) {
      this.tempUnitIsCelsius = true;
      this.tempUnitText = "Celcius";
      this.tempUnitSuffix = "°C"
    }
    else {
      this.tempUnitIsCelsius = false;
      this.tempUnitText = "Fahrenheit";
      this.tempUnitSuffix = "°F"
    }
  }

  tempConvert(value: number): number {
    if (this.tempUnitIsCelsius) {
      return this.convertKelvinToCelcuis(value);
    }
    else {
      return this.convertKelvinToFahrenheit(value);
    }
  }

  convertKelvinToCelcuis(value: number): number {
    return Math.floor(value - 273.15);
  }

  convertKelvinToFahrenheit(value: number): number {
    return Math.floor(9 / 5 * (value - 273.15) + 32);
  }

  floor(value: number): number {
    return Math.floor(value);
  }

  setCurrentDayWeatherEntity(dayIndex: number, sliderHourIndex: number): void {
    let sliderHour = 0;
    if (sliderHourIndex > 0) sliderHour = Math.floor(sliderHourIndex / 4);
    this.currentDayWeather = this.fiveDayWeather[dayIndex].timedWeatherDetail[sliderHour];
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(private weatherService: WeatherService) {
  }

  private getWeatherForecast(locationId: number){
    this.weatherService.getWeatherForecast(3).then(forecastArray => {
      this.fiveDayWeather = forecastArray;
      this.setCurrentDayWeatherEntity(this.selectedTabIndex, this.hourSelected);
    });
  }

  ngOnInit(): void {
    // default location 
    this.selectedLocation = {name:'London', localeId: 23}
    // Init search 
    this.locales = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => {
        console.log('In Search Observable with term ' + term);
        return term ? this.weatherService.search(term) : Observable.of<WeatherLocation[]>([])
      })
      .catch(error => {

        // Ideally error handling will be different than just spewing to the console.
        console.log('Exception occured in Weather observable search: ${error}');
        return Observable.of<WeatherLocation[]>([]);
      })
    
    this.getWeatherForecast(3);
    this.lastUpdate = "03 December, 20:35";

    // this.fiveDayReportArray = [
    //   {day: "03 Dec 2017", locale:"Ashtead, Surrey", temperature: 5, wind: 12, windDirection: "NE", humidity: 70, precipitation: 58, shortDescription:"Mostly Sunny", daytime:"Sat2, 15:45"},
    //   {day: "04 Dec 2017", locale:"Ashtead, Surrey", temperature: 4, wind: 8, windDirection: "NE", humidity: 80, precipitation: 73, shortDescription:"Cloudy and Cold", daytime:"Sat3, 15:45"},
    //   {day: "05 Dec 2017", locale:"Ashtead, Surrey", temperature: 6, wind: 3, windDirection: "NE", humidity: 90, precipitation: 83,  shortDescription:"Blazing HOt", daytime:"Sat4, 15:45"},
    //   {day: "06 Dec 2017", locale:"Ashtead, Surrey", temperature: -3, wind: 19, windDirection: "NE", humidity: 60, precipitation: 24, shortDescription:"Cloud and Sunny", daytime:"Sat5, 15:45"},
    //   {day: "07 Dec 2017", locale:"Ashtead, Surrey", temperature: 9, wind: 4, windDirection: "NE", humidity: 40, precipitation: 18, shortDescription:"Rainy", daytime:"Sat6, 15:45"},
    // ]

    // well be set when service call is made
    // this.setCurrentDayWeatherEntity(0);
    //   this.fiveDayWeather = [
    //     {
    //         "weatherDay": "01/02/2017",
    //         "locale": "Moscow",
    //         "localeId": 524901,
    //         "TimedWeatherDetail": [
    //             {

    //                 "temperature": 266.104,
    //                 "wind": 3.81,
    //                 "windDirection": 269.004,
    //                 "humidity": 90,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-01T00:00:00+00:00",
    //                 "precipitation": 0.1025,
    //                 "hour": 0
    //             },
    //             {

    //                 "temperature": 266.904,
    //                 "wind": 4.26,
    //                 "windDirection": 274.002,
    //                 "humidity": 89,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-01T03:00:00+00:00",
    //                 "precipitation": 0.12,
    //                 "hour": 3
    //             },
    //             {

    //                 "temperature": 268.102,
    //                 "wind": 4.4,
    //                 "windDirection": 283.501,
    //                 "humidity": 89,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-01T06:00:00+00:00",
    //                 "precipitation": 0.13,
    //                 "hour": 6
    //             },
    //             {

    //                 "temperature": 270.269,
    //                 "wind": 4.53,
    //                 "windDirection": 297.5,
    //                 "humidity": 92,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-01T09:00:00+00:00",
    //                 "precipitation": 0.1875,
    //                 "hour": 9
    //             },
    //             {

    //                 "temperature": 270.585,
    //                 "wind": 4.31,
    //                 "windDirection": 302.004,
    //                 "humidity": 89,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-01T12:00:00+00:00",
    //                 "precipitation": 0.065,
    //                 "hour": 12
    //             },
    //             {

    //                 "temperature": 269.661,
    //                 "wind": 4.91,
    //                 "windDirection": 296.5,
    //                 "humidity": 89,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-01T15:00:00+00:00",
    //                 "precipitation": 0.0825,
    //                 "hour": 15
    //             },
    //             {

    //                 "temperature": 269.155,
    //                 "wind": 5.7,
    //                 "windDirection": 310.501,
    //                 "humidity": 89,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-01T18:00:00+00:00",
    //                 "precipitation": 0.11,
    //                 "hour": 18
    //             },
    //             {

    //                 "temperature": 268.056,
    //                 "wind": 5.56,
    //                 "windDirection": 333,
    //                 "humidity": 89,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-01T21:00:00+00:00",
    //                 "precipitation": 0.225,
    //                 "hour": 21
    //             }
    //         ]
    //     },
    //     {
    //         "weatherDay": "02/02/2017",
    //         "locale": "Moscow",
    //         "localeId": 524901,
    //         "TimedWeatherDetail": [
    //             {

    //                 "temperature": 265.803,
    //                 "wind": 4.8,
    //                 "windDirection": 355.004,
    //                 "humidity": 83,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-02T00:00:00+00:00",
    //                 "precipitation": 0.03,
    //                 "hour": 0
    //             },
    //             {

    //                 "temperature": 263.381,
    //                 "wind": 4.2,
    //                 "windDirection": 348.503,
    //                 "humidity": 84,
    //                 "shortDescription": "clear sky",
    //                 "dayTime": "2017-02-02T03:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 3
    //             },
    //             {

    //                 "temperature": 261.85,
    //                 "wind": 3.81,
    //                 "windDirection": 345.502,
    //                 "humidity": 76,
    //                 "shortDescription": "clear sky",
    //                 "dayTime": "2017-02-02T06:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 6
    //             },
    //             {

    //                 "temperature": 263.455,
    //                 "wind": 3.06,
    //                 "windDirection": 344.004,
    //                 "humidity": 84,
    //                 "shortDescription": "clear sky",
    //                 "dayTime": "2017-02-02T09:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 9
    //             },
    //             {

    //                 "temperature": 264.015,
    //                 "wind": 2.52,
    //                 "windDirection": 334.501,
    //                 "humidity": 85,
    //                 "shortDescription": "clear sky",
    //                 "dayTime": "2017-02-02T12:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 12
    //             },
    //             {

    //                 "temperature": 259.684,
    //                 "wind": 2.48,
    //                 "windDirection": 320.501,
    //                 "humidity": 76,
    //                 "shortDescription": "clear sky",
    //                 "dayTime": "2017-02-02T15:00:00+00:00",
    //                 "precipitation": 0.0024999999999999,
    //                 "hour": 15
    //             },
    //             {

    //                 "temperature": 255.188,
    //                 "wind": 1.23,
    //                 "windDirection": 283.003,
    //                 "humidity": 66,
    //                 "shortDescription": "few clouds",
    //                 "dayTime": "2017-02-02T18:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 18
    //             },
    //             {

    //                 "temperature": 255.594,
    //                 "wind": 1.22,
    //                 "windDirection": 244.502,
    //                 "humidity": 64,
    //                 "shortDescription": "scattered clouds",
    //                 "dayTime": "2017-02-02T21:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 21
    //             }
    //         ]
    //     },
    //     {
    //         "weatherDay": "03/02/2017",
    //         "locale": "Moscow",
    //         "localeId": 524901,
    //         "TimedWeatherDetail": [
    //             {

    //                 "temperature": 256.96,
    //                 "wind": 1.23,
    //                 "windDirection": 237.506,
    //                 "humidity": 66,
    //                 "shortDescription": "scattered clouds",
    //                 "dayTime": "2017-02-03T00:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 0
    //             },
    //             {

    //                 "temperature": 258.109,
    //                 "wind": 1.21,
    //                 "windDirection": 234.502,
    //                 "humidity": 77,
    //                 "shortDescription": "broken clouds",
    //                 "dayTime": "2017-02-03T03:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 3
    //             },
    //             {

    //                 "temperature": 259.533,
    //                 "wind": 1.21,
    //                 "windDirection": 229.509,
    //                 "humidity": 76,
    //                 "shortDescription": "broken clouds",
    //                 "dayTime": "2017-02-03T06:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 6
    //             },
    //             {

    //                 "temperature": 263.438,
    //                 "wind": 1.51,
    //                 "windDirection": 242.503,
    //                 "humidity": 84,
    //                 "shortDescription": "broken clouds",
    //                 "dayTime": "2017-02-03T09:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 9
    //             },
    //             {

    //                 "temperature": 264.228,
    //                 "wind": 1.58,
    //                 "windDirection": 242.503,
    //                 "humidity": 89,
    //                 "shortDescription": "broken clouds",
    //                 "dayTime": "2017-02-03T12:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 12
    //             },
    //             {

    //                 "temperature": 261.153,
    //                 "wind": 1.21,
    //                 "windDirection": 198.501,
    //                 "humidity": 80,
    //                 "shortDescription": "clear sky",
    //                 "dayTime": "2017-02-03T15:00:00+00:00",
    //                 "precipitation": 0.0049999999999999,
    //                 "hour": 15
    //             },
    //             {

    //                 "temperature": 258.818,
    //                 "wind": 1.21,
    //                 "windDirection": 209.002,
    //                 "humidity": 73,
    //                 "shortDescription": "broken clouds",
    //                 "dayTime": "2017-02-03T18:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 18
    //             },
    //             {

    //                 "temperature": 257.218,
    //                 "wind": 1.17,
    //                 "windDirection": 194.501,
    //                 "humidity": 65,
    //                 "shortDescription": "scattered clouds",
    //                 "dayTime": "2017-02-03T21:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 21
    //             }
    //         ]
    //     },
    //     {
    //         "weatherDay": "04/02/2017",
    //         "locale": "Moscow",
    //         "localeId": 524901,
    //         "TimedWeatherDetail": [
    //             {

    //                 "temperature": 255.782,
    //                 "wind": 1.21,
    //                 "windDirection": 175.001,
    //                 "humidity": 73,
    //                 "shortDescription": "broken clouds",
    //                 "dayTime": "2017-02-04T00:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 0
    //             },
    //             {

    //                 "temperature": 254.819,
    //                 "wind": 1.22,
    //                 "windDirection": 122.001,
    //                 "humidity": 68,
    //                 "shortDescription": "clear sky",
    //                 "dayTime": "2017-02-04T03:00:00+00:00",
    //                 "precipitation": 0.0049999999999999,
    //                 "hour": 3
    //             },
    //             {

    //                 "temperature": 257.488,
    //                 "wind": 2.13,
    //                 "windDirection": 155.501,
    //                 "humidity": 63,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-04T06:00:00+00:00",
    //                 "precipitation": 0.04,
    //                 "hour": 6
    //             },
    //             {

    //                 "temperature": 259.827,
    //                 "wind": 2.07,
    //                 "windDirection": 170.005,
    //                 "humidity": 90,
    //                 "shortDescription": "light snow",
    //                 "dayTime": "2017-02-04T09:00:00+00:00",
    //                 "precipitation": 0.03,
    //                 "hour": 9
    //             },
    //             {

    //                 "temperature": 261.256,
    //                 "wind": 2.32,
    //                 "windDirection": 175.001,
    //                 "humidity": 86,
    //                 "shortDescription": "clear sky",
    //                 "dayTime": "2017-02-04T12:00:00+00:00",
    //                 "precipitation": 0.0049999999999999,
    //                 "hour": 12
    //             },
    //             {

    //                 "temperature": 260.26,
    //                 "wind": 2.47,
    //                 "windDirection": 180.501,
    //                 "humidity": 86,
    //                 "shortDescription": "broken clouds",
    //                 "dayTime": "2017-02-04T15:00:00+00:00",
    //                 "precipitation": 0,
    //                 "hour": 15
    //             }
    //         ]
    //     }
    // ]

  }

}


