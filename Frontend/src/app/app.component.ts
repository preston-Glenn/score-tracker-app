import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'score-keeper';

  constructor( private router: Router ) { }

  route(){
    this.router.navigate(['/login']);

  }

}
