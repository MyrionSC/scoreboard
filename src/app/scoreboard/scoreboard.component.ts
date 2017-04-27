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
  changeTimer = 20;
  onFirstPage = true;


  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.on('score_init', (server_score) => {
      console.log("score change received from server:\n");
      console.log(server_score);
      this.score = server_score;

      this.changeView();
      setInterval(() => {
        this.onFirstPage = !this.onFirstPage;
        this.changeView();
      }, this.changeTimer * 1000);
    });
    this.socketService.on('score_change', (new_score) => {
      console.log("score change received from server:\n");
      console.log(new_score);
      this.score = new_score;
    });

    // while testing
    // this.score = [{"activity":"aktivitet1","team":"hold1","time":10},{"activity":"aktivitet2","team":"hold2","time":20},{"activity":"aktivitet3","team":"hold3","time":30},{"activity":"aktivitet4","team":"hold4","time":40}
    // ,{"activity":"aktivitet5","team":"hold1","time":10},{"activity":"aktivitet6","team":"hold2","time":20},{"activity":"aktivitet7","team":"hold3","time":30},{"activity":"aktivitet8","team":"hold4","time":40}
    // ,{"activity":"aktivitet9","team":"hold1","time":10},{"activity":"aktivitet10","team":"hold2","time":20},{"activity":"aktivitet11","team":"hold3","time":30},{"activity":"aktivitet12","team":"hold4","time":40}
    // ,{"activity":"aktivitet13","team":"hold1","time":10},{"activity":"aktivitet14","team":"hold2","time":20},{"activity":"aktivitet15","team":"hold3","time":30},{"activity":"aktivitet16","team":"hold4","time":40}];
    //
    // this.changeView();
    // setInterval(() => {
    //   this.onFirstPage = !this.onFirstPage;
    //   this.changeView();
    // }, this.changeTimer * 1000);
  }
  ngOnDestroy() {
    this.socketService.off('score_change');
  }

  // change view logic. We are assuming that there are only two pages of score
  changeView(): void {
    if (this.onFirstPage) {
      this.shownScore = this.score.slice(0, this.listSize);
    } else {
      this.shownScore = this.score.slice(this.listSize, this.score.length);
    }
  }

  private getListSize(): number {
    // get pagelength
    let PageHeight: number = window.screen.height - 200;
    let contentHeight = 60;
    return Math.floor(PageHeight / contentHeight) - 1;
  }



}
