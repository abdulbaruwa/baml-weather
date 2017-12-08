import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule } from '@angular/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { FormsModule } from '@angular/forms';
import { WeatherForecast, TimedWeatherDetail, ForecastLocation } from '../models/weather';
import { WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Bring in Reactive extension namespaces
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbar, MatMenuModule, MatSliderModule, MatCardModule, MatAutocompleteModule, MatAutocomplete } from '@angular/material';

// Fakes
export class FakeWeatherService  extends WeatherService {
  
}

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  // The injected service
  let componentWeatherService: WeatherService;
  // The testbed's injected service
  let weatherService: WeatherService;
  let debugElement: DebugElement;
  let element: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        HttpModule,
        MatSelectModule,
        MatIconModule,
        MatMenuModule,
        MatSliderModule,
        MatCardModule,
        MatAutocompleteModule],
      declarations: [WeatherComponent],
      providers: [ WeatherService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // ensure weatherservice is injected
    weatherService = fixture.debugElement.injector.get(WeatherService);
    componentWeatherService = weatherService;
    weatherService = TestBed.get(WeatherService)
  });

it('should create', () => {
  expect(component).toBeTruthy();
});
  

});

//TODO Abdul: There a lot more test that i could write, with no guidance on time from the agent hard to commit more time.