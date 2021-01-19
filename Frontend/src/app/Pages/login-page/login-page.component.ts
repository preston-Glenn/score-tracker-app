
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { user } from 'src/app/Models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: String
  usernameControl = new FormControl('');

  constructor(private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

  }

  async next(){
    if(this.usernameControl.value === ""){
      alert("Please Enter a Username")
    } else {
      this.username = this.usernameControl.value
      this.usernameControl.setValue("")
      this.router.navigate(['/home', { username: this.username}]);
    }

  }

}
