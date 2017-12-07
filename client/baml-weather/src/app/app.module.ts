import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbar, MatMenuModule, MatSliderModule, MatCardModule, MatAutocompleteModule, MatAutocomplete } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { WeatherComponent } from './weather/weather.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
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
      MatAutocompleteModule,
      AppRoutingModule
    ],
    providers: [WeatherService],
    bootstrap: [AppComponent]
  })

export class AppModule { }
