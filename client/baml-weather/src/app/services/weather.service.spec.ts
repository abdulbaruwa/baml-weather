import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { MockBackend, MockConnection} from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions} from '@angular/http';
import { DayWeather, TimedWeatherDetail, WeatherLocation } from '../models/weather';
import { Observable } from 'rxjs/Observable';
import { Console } from '@angular/core/src/console';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule],
      providers: [WeatherService,{provide: XHRBackend, useClass: MockBackend}]
    }).compileComponents();
  });

  it('should be created', inject([Http, XHRBackend, WeatherService], (http: Http, bend: MockBackend, service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});
