import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Pages/home-page/home-page.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ScoreboardComponent } from './Components/scoreboard/scoreboard.component';
import { ScoreboardPageComponent } from './Pages/scoreboard-page/scoreboard-page.component'
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './Pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ScoreboardComponent,
    ScoreboardPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
