import { Component, Input, OnInit } from '@angular/core';
import { scoreboard } from 'src/app/Models/scoreboard';
import {UserScorePairs} from 'src/app/Models/UserScorePairs'

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
@Input() scoreboard: scoreboard
sbName: string
sbPairs: UserScorePairs[]

  constructor() { }

  ngOnInit(): void {
//subscribe to input scoreboard
    this.sbName=this.scoreboard.scoreboardName
    this.sbPairs = this.scoreboard.userScores

  }

}
