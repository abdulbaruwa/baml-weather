import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbar, MatMenuModule, MatSliderModule, MatCardModule, MatAutocompleteModule, MatAutocomplete } from '@angular/material';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({    
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [
        MatInputModule, 
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatMenuModule,
        MatSliderModule,
        MatCardModule,
        MatAutocompleteModule
        
      ],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
