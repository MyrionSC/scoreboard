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

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.on("score_init", (server_score) => {
      console.log("score received from server:\n");
      console.log(server_score);
      this.score = this.copyArray(server_score);
      this.oldScore = this.copyArray(server_score);
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
    this.score = this.copyArray(this.oldScore);
  }

  private copyArray (ar: Array<Activity>): Array<Activity> {
    // roundabout way to get copy by value instead of copy by reference
    return JSON.parse(JSON.stringify(ar));
  }
}
