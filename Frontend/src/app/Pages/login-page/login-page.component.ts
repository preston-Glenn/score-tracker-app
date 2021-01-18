import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, public http: HttpClient ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.sb_id = params.get('sb_id')
      this.user_id = params.get('user_id')

      });

  }

}
