import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbar, MatMenuModule, MatSliderModule, MatCardModule, MatAutocompleteModule, MatAutocomplete } from '@angular/material';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
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
      declarations: [ WeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
