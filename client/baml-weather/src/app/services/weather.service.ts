import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { WeatherForecast, TimedWeatherDetail, ForecastLocation } from '../models/weather';
import { Observable } from 'rxjs/Observable';
import { Console } from '@angular/core/src/console';
import { environment } from '../../environments/environment';
@Injectable()
export class WeatherService {

  // Abdul TODO: Move all these to environment.config
  private weatherServiceUrl = '/api/weather/getbylocation/';
  private locationSearchServiceUrl = '/api/weather/searchlocation/';
  private serviceBase = "http://localhost:63494";

   constructor(private http: Http) {
     this.getConfigAsync();
  }

  async getConfigAsync()
  {
   await environment.then(environment => {
      // Get base service address from environment file
      //ABDUL TODO Unable to await this ... more work needs to be done here
      this.serviceBase = environment['api_url']
    });
  }

  search(term: string): Observable<ForecastLocation[]> {
    var url = `${this.serviceBase}${this.locationSearchServiceUrl}${term}`;
    console.log(url);
    return this.http
      .get(url)
      .map((r: Response) => {
        var resp = r.json();
        // console.log(resp)
        return resp as ForecastLocation[];
      }
      )
      .catch((error: any) => {
        console.error('An errored occured whilst searching on location', error);
        return Observable.throw(error.message || error);
      });
  }

  getWeatherForecast(locationId: number): Promise<Array<WeatherForecast>> {
    // Abdul TDOO: Time permiting Bring in a logging component
    console.log(`Service called for id: ${locationId}`)
    return this.http
      .get(this.serviceBase + this.weatherServiceUrl + `${locationId}`)
      .toPromise()
      .then((response) => {
        var result = response.json()
        return result as WeatherForecast[];
      })
      .catch(this.errorHandler);
  }

  private errorHandler(error: any): Promise<any> {
    console.error('Error thrown in service', error);
    return Promise.reject(error.message || error);
  }
}
