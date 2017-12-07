import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

import { AppComponent } from './app.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbar, MatMenuModule, MatSliderModule, MatCardModule, MatAutocompleteModule, MatAutocomplete } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenu } from '@angular/material/menu';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherComponent } from './weather/weather.component';
import { DaytabComponent } from './daytab/daytab.component';
import { WeatherService } from './services/weather.service';

@NgModule({
    declarations: [
      AppComponent,
      NavbarComponent,
      WeatherComponent,
      DaytabComponent
    ],
  
    imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpModule,
      BrowserAnimationsModule,
      MatInputModule, 
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatToolbarModule,
      MatMenuModule,
      MatSliderModule,
      MatCardModule,
      MatTabsModule,
      MatSlideToggleModule,
      MatAutocompleteModule
      
    ],
 
    providers: [WeatherService],
    bootstrap: [AppComponent]
  })

export class AppModule { }
