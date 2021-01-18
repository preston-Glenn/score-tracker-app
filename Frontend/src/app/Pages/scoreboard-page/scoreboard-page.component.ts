import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scoreboard } from 'src/app/Models/scoreboard';
import axios from 'axios'
import { HttpClient  } from "@angular/common/http"
import { user } from 'src/app/Models/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-scoreboard-page',
  templateUrl: './scoreboard-page.component.html',
  styleUrls: ['./scoreboard-page.component.css']
})
export class ScoreboardPageComponent implements OnInit {


user: user
sb_id: any
user_id: string
scoreboard: scoreboard
usernameControl = new FormControl('');

constructor(private route: ActivatedRoute, public http: HttpClient ) { }

async ngOnInit() {

  this.route.paramMap.subscribe( params => {
    this.sb_id = params.get('sb_id')
    this.user_id = params.get('user_id')

    });

 await axios.get('http://localhost:5000/scoreboards/ss/'+this.sb_id).then((response) => {
    this.scoreboard = response.data
  }).catch(err => console.log(err))

 await axios.get('http://localhost:5000/users/id/'+this.user_id).then((response) => {
    this.user = response.data
  }).catch(err => console.log(err))
}

async addUser(){
  if(this.usernameControl.value === ""){
    alert("Please Enter a Username")
  } else {
    const username = this.usernameControl.value
    this.usernameControl.setValue("")

    await axios.post('http://localhost:5000/users/addUserToScoreboard/'+this.sb_id,{username:username}).then((response) => {
    this.scoreboard = response.data
    console.log(this.scoreboard)
  }).catch(err => {
    alert("Something went wrong. Please make sure that user isn't already on the scoreboard.")
    console.log(err)
  })
  }
}

async add(pair:any){
console.log(pair)
}

async subtract(pair:any){
  console.log(pair)
  }
}
