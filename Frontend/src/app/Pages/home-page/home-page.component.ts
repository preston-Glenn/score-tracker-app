import { Component, OnInit } from '@angular/core';
import { scoreboard } from 'src/app/Models/scoreboard';
import { user } from 'src/app/Models/user';
import { FormControl } from '@angular/forms';
import  *  as  sb  from '../../Models/data.json'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { HttpClient  } from "@angular/common/http"


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: user
  username: String
  usernameControl = new FormControl('');
  scoreboards: scoreboard[]
  newScoreBoardControl = new FormControl('');
  SB_name: string

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.username = params.get('username')
      });
    this.getUserInfo()

  }

  async getUserInfo(){

      // if username exists SB.findById()
      // else create user
      await axios.get('https://score-tracker-api.herokuapp.com/users/'+this.username)
      .then(response => {
         this.user = response.data
      })
      .catch(function (error) {
        console.log(error);
      })

      if(this.user == null){

        await axios.post('https://score-tracker-api.herokuapp.com/users/add/'+this.username)
      .then(response => {
         this.user = response.data
      })
      .catch(function (error) {
        console.log(error);
      })
      }
      const ids = {
        scoreboardIDs: this.user.scorboards_ID
      }

      if(this.user.scorboards_ID){
      await axios.get('https://score-tracker-api.herokuapp.com/scoreboards/'+this.user._id)
      .then(response => {
        this.scoreboards  = response.data
      })
      .catch(function (error) {
        console.log(error);
      })} else {
        this.scoreboards = []
      }


  }

  routeToScoreBoard(sb: scoreboard){
    this.router.navigate(['/scoreboard', { sb_id: sb._id, user_id: this.user._id}]);
  }

  //once username is set we need to observe  user


  async createNewScoreboard(){
    if(this.newScoreBoardControl.value === ""){
      alert("Please enter a name for the new Scoreboard")
    } else {
      this.SB_name = this.newScoreBoardControl.value
      this.newScoreBoardControl.setValue("")
      let sb_id = ""
      await axios.post('https://score-tracker-api.herokuapp.com/scoreboards/new',{scoreboardName:this.SB_name,username:this.username})
      .then(res => {
        sb_id = res.data._id
      }).catch(function (error) {
        console.log(error);
      })

      this.router.navigate(['/scoreboard', { sb_id: sb_id, user_id: this.user._id}]);

    }
  }
}
