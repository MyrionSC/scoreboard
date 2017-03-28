import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  private socket = io();

  constructor() {
    this.socket.connect();
  }

  ngOnInit() {
  }

}
