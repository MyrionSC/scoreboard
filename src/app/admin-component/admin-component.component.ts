import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css'],
  providers: [SocketService]
})
export class AdminComponentComponent implements OnInit, OnDestroy {
  private score: Array<any> = [
    {
      "activity": "længdespring",
      "team": "hold1",
      "time": 90
    },
    {
      "activity": "vikingespil",
      "team": "hold2",
      "time": 32
    },
    {
      "activity": "svømning",
      "team": "hold3",
      "time": 42
    },
    {
      "activity": "blah",
      "team": "hold4",
      "time": 80.234
    }
  ];

  private oldScore: Array<any> = [
    {
      "activity": "længdespring",
      "team": "hold1",
      "time": 90
    },
    {
      "activity": "vikingespil",
      "team": "hold2",
      "time": 32
    },
    {
      "activity": "svømning",
      "team": "hold3",
      "time": 42
    },
    {
      "activity": "blah",
      "team": "hold4",
      "time": 80.234
    }
  ];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    // this.socketService.on("score_change", (new_score) => {
    //   console.log("score change received from server:\n");
    //   console.log(new_score);
    //   // somehow angular doesn't understand that json loaded from a file is an array, so eval() has to be used then
    //   this.score = new_score instanceof Array ? new_score : eval(new_score);
    //   }
    // )
  }

  ngOnDestroy () {
    this.socketService.off("score_change");
  }

  saveScore():void {
    console.log(this.score);
    // this.socketService.emit("new_score", this.testdata)
  }
  revertChanges():void {
    this.score = this.oldScore;
  }
}
