import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './Pages/home-page/home-page.component'
import { ScoreboardPageComponent } from './Pages/scoreboard-page/scoreboard-page.component'
import { LoginPageComponent } from './Pages/login-page/login-page.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'home/:username', component: HomePageComponent},
  { path: 'scoreboard', component: ScoreboardPageComponent },
  { path: 'scoreboard/:sb_id/:user_id', component: ScoreboardPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
