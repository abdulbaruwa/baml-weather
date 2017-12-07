import { Component, OnInit } from '@angular/core';
import { DayWeather, TimedWeatherDetail, WeatherLocation } from '../models/weather';
import { WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Bring in Reactive extension namespaces
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

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
  selectedTabIndex: number = 0;
  tempUnitIsCelsius: boolean = true;
  tempUnitText: string = "Celsius";
  tempUnitSuffix = "°C"
  date = new Date().toLocaleDateString();
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

  }

}


