import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { DayWeather, TimedWeatherDetail, WeatherLocation } from '../models/weather';
import { Observable } from 'rxjs/Observable';
import { Console } from '@angular/core/src/console';
                      
@Injectable()
export class WeatherService {

  constructor(private http: Http) { }
  private weatherServiceUrl = '/api/weather/getbylocation/';
  private locationSearchServiceUrl = '/api/weather/searchlocation/';
  private serviceBase = 'http://localhost:63494';

  search(term: string):Observable<WeatherLocation[]>{
    var url = `${this.serviceBase}${this.locationSearchServiceUrl}${term}`;
    console.log(url);
    return this.http
    .get(url)
    .map((r: Response) =>
    {
      var resp = r.json();
      // console.log(resp)
      return  resp as WeatherLocation[];
    }
  )
    .catch((error: any) => {
        console.error('An errored occured whilst searching on location', error);
        return Observable.throw(error.message || error);
    });
  }

  getWeatherForecast(locationId: number): Promise<Array<DayWeather>>{
    return this.http
    .get(this.serviceBase + this.weatherServiceUrl + `${locationId}`)
    .toPromise()
    .then((response) => {
      var result = response.json()
      return result as  DayWeather[];
    })
    .catch(this.errorHandler);
  }

  private errorHandler(error: any): Promise<any>{
    console.error('Error thrown in service', error);
    return Promise.reject(error.message || error);
  }
}
