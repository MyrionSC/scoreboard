import {Component, OnInit, OnDestroy} from '@angular/core';
import { SocketService } from '../socket.service';

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
  changeTimer = 5;
  pageNr = 0;
  showSchedule = false;
  latestNews = '';

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.on('score_init', (server_score) => {
      console.log("score change received from server:\n");
      console.log(server_score);
      this.score = server_score;

      this.changeView();
      setInterval(() => {
        this.changeView();
      }, this.changeTimer * 1000);
    });
    this.socketService.on('score_change', (new_score) => {
      console.log("score change received from server:\n");
      console.log(new_score);
      this.score = new_score;
    });
    this.socketService.on('new_news', (new_news) => {
      console.log('new news item received from server: ' + new_news);
      this.latestNews = new_news;
    });



    // get some testdata from server.js if necessary

    // this.changeView();
    // setInterval(() => {
    //   this.changeView();
    // }, this.changeTimer * 1000);
  }
  ngOnDestroy() {
    this.socketService.off('score_change');
  }

  // change view logic. We are assuming that there are only two pages of score
  private changeView(): void {
    if (this.pageNr === 0) {
      this.showSchedule = false;
      this.shownScore = this.score.slice(0, this.listSize);
    } else if (this.pageNr === 1) {
      this.shownScore = this.score.slice(this.listSize, this.score.length);
    } else { // pageNr is 2
      // show pdf
      this.showSchedule = true;
    }
    this.changePageNr();
  }

  private getListSize(): number {
    // get pagelength
    let PageHeight: number = window.screen.height - 200;
    let contentHeight = 60;
    return Math.floor(PageHeight / contentHeight) - 1;
  }

  private changePageNr() {
    this.pageNr += 1;
    if (this.pageNr === 3) {
      this.pageNr = 0;
    }
  }
}
