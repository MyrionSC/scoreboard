import {Component, OnInit, OnDestroy} from '@angular/core';
import { SocketService } from '../socket.service';
import {Activity} from "../activity";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
  providers: [SocketService]
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  score: Array<any>;
  shownScore: Array<any>;
  nihlogosrc: string = "assets/images/nihlogo.png";

  listSize: number = this.getListSize();
  activityShowCounter = 0;
  changeTimer = 10;


  constructor(private socketService: SocketService) {}

  ngOnInit() {
    // this.socketService.on('score_change', (new_score) => {
    //   console.log("score change received from server:\n");
    //   console.log(new_score);
    //   this.score = new_score;
    // });


    // while testing
    this.score = [{"activity":"aktivitet1","team":"hold1","time":10},{"activity":"aktivitet2","team":"hold2","time":20},{"activity":"aktivitet3","team":"hold3","time":30},{"activity":"aktivitet4","team":"hold4","time":40}
    ,{"activity":"aktivitet5","team":"hold1","time":10},{"activity":"aktivitet6","team":"hold2","time":20},{"activity":"aktivitet7","team":"hold3","time":30},{"activity":"aktivitet8","team":"hold4","time":40}
    ,{"activity":"aktivitet9","team":"hold1","time":10},{"activity":"aktivitet10","team":"hold2","time":20},{"activity":"aktivitet11","team":"hold3","time":30},{"activity":"aktivitet12","team":"hold4","time":40}
    ,{"activity":"aktivitet13","team":"hold1","time":10},{"activity":"aktivitet14","team":"hold2","time":20},{"activity":"aktivitet15","team":"hold3","time":30},{"activity":"aktivitet16","team":"hold4","time":40}];

    this.changeView();
    // setInterval(this.changeView(), this.changeTimer * 1000);
  }
  ngOnDestroy() {
    this.socketService.off('score_change');
  }

  // change view logic
  changeView(): void {

    // this is shit, use slice instead
    
    // this.shownScore = [];
    // let offset = this.activityShowCounter;
    // for (let i = this.activityShowCounter; i < this.score.length; i++) {
    //   if (i > this.score.length) {
    //     this.activityShowCounter = 0;
    //     break;
    //   }
    //
    //   if (i < offset + this.listSize) {
    //     let s: Activity = this.score[i];
    //     this.shownScore.push(s);
    //   } else {
    //     break;
    //   }
    // }
  }

  private getListSize(): number {
    // get pagelength
    let PageHeight: number = window.screen.height - 90;
    let contentHeight = 41;
    return Math.floor(PageHeight / contentHeight);
  }



}
