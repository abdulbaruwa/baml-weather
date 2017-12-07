import { TestBed, inject, async } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { DayWeather, TimedWeatherDetail, WeatherLocation } from '../models/weather';
import { Observable } from 'rxjs/Observable';
import { Console } from '@angular/core/src/console';

const buildWeatherData = () => [
  {weatherDay:'07-Dec-2018', locale: 'London', localeId: 5555, timedWeatherDetail:[
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:3},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:6},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:9},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:11},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:13},
  ] },
  {weatherDay:'08-Dec-2018', locale: 'London', localeId: 5555, timedWeatherDetail:[
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:3},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:6},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:9},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:11},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:13},
  ] },
  {weatherDay:'09-Dec-2018', locale: 'London', localeId: 5555, timedWeatherDetail:[
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:3},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:6},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:9},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:11},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:13},
  ] },
  {weatherDay:'10-Dec-2018', locale: 'London', localeId: 5555, timedWeatherDetail:[
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:3},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:6},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:9},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:11},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:13},
  ] },
  {weatherDay:'11-Dec-2018', locale: 'London', localeId: 5555, timedWeatherDetail:[
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:3},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:6},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:9},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:11},
    {temperature:-2, wind:22,humidity:32, shortDescription:"Cold Windy Day", dayTime:"", precipitation:0, hour:13},
  ] },
] as DayWeather[]

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [WeatherService, { provide: XHRBackend, useClass: MockBackend }]
    }).compileComponents();
  });

  it('can be instantiated with a XHR-based Backend', inject([Http, XHRBackend, WeatherService], (http: Http, bend: MockBackend, service: WeatherService) => {
    expect(service).toBeTruthy();
  }));

  it('can new up service via constructor', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new WeatherService(http);
    expect(service instanceof WeatherService).toBe(true, 'new service spun up fine');
  }));

  it('can new up service when inject service',
    inject([WeatherService], (service: WeatherService) => {
      expect(service instanceof WeatherService).toBe(true);
    }));


    describe('when getWeatherForecast', () => {
      let backend: MockBackend;
      let service: WeatherService;
      let response: Response;
      let locationId: number = 0;
      let dummyDayWeatherData: DayWeather[];
      beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new WeatherService(http);
        dummyDayWeatherData = buildWeatherData();
        let options = new ResponseOptions({body: dummyDayWeatherData});
        response = new Response(options);
      }));

      it('should have expected dummy data (then)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        service.getWeatherForecast(locationId)
          .then(wthr => {
            expect(wthr.length).toBe(dummyDayWeatherData.length,
              'should have expected 5 day weather forecast ');
          });
      })));
    });

});
