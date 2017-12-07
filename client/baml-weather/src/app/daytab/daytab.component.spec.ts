import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaytabComponent } from './daytab.component';

describe('DaytabComponent', () => {
  let component: DaytabComponent;
  let fixture: ComponentFixture<DaytabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaytabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaytabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
