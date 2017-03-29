import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../socket.service';
import {Activity} from "../activity";

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css'],
  providers: [SocketService]
})
export class AdminComponentComponent implements OnInit, OnDestroy {
  private score: Array<Activity>;
  private oldScore: Array<Activity>;
  // private score: Array<Activity> = [
  //   {
  //     "activity": "længdespring",
  //     "team": "hold1",
  //     "time": 90
  //   },
  //   {
  //     "activity": "vikingespil",
  //     "team": "hold2",
  //     "time": 32
  //   },
  //   {
  //     "activity": "svømning",
  //     "team": "hold3",
  //     "time": 42
  //   },
  //   {
  //     "activity": "blah",
  //     "team": "hold4",
  //     "time": 80.234
  //   }
  // ];
  //
  // private oldScore: Array<Activity> = [
  //   {
  //     "activity": "længdespring",
  //     "team": "hold1",
  //     "time": 90
  //   },
  //   {
  //     "activity": "vikingespil",
  //     "team": "hold2",
  //     "time": 32
  //   },
  //   {
  //     "activity": "svømning",
  //     "team": "hold3",
  //     "time": 42
  //   },
  //   {
  //     "activity": "blah",
  //     "team": "hold4",
  //     "time": 80.234
  //   }
  // ];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.on("score_change", (new_score) => {
      console.log("score change received from server:\n");
      console.log(new_score);
      // somehow angular doesn't understand that json loaded from a file is an array, so eval() has to be used then
      // this.score = new_score instanceof Array ? new_score : eval(new_score);
      this.score = this.copyArray(new_score);
      this.oldScore = this.copyArray(new_score);
      }
    )
  }

  ngOnDestroy () {
    this.socketService.off("score_change");
  }

  addActivity () {
    this.score.push(new Activity());
  }
  removeActivity (ac: Activity) {
    let index: number = this.score.indexOf(ac);
    if (index != -1) {
      this.score.splice(index, 1);
    }
  }

  saveScore():void {
    console.log("Saving score");
    console.log(this.score);
    this.oldScore = this.copyArray(this.score);

    this.socketService.emit("new_score", this.score)
  }
  revertChanges():void {
    console.log("reverting changes");
    // roundabout way to get copy by value instead of copy by reference
    this.score = this.copyArray(this.oldScore);
  }

  private copyArray (ar: Array<Activity>): Array<Activity> {
    return JSON.parse(JSON.stringify(ar));
  }
}
