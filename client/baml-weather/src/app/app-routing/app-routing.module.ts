import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from '../weather/weather.component';

const routes: Routes = [
  {
    path: '',
    children: [],
    component: WeatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule],
})

export class AppRoutingModule { }
