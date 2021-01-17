import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './Pages/home-page/home-page.component'
import { ScoreboardPageComponent } from './Pages/scoreboard-page/scoreboard-page.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'scoreboard', component: ScoreboardPageComponent },
  { path: 'scoreboard/:sb_id/:user_id', component: ScoreboardPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
