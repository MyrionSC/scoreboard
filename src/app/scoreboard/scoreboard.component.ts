import {Component, OnInit, OnDestroy, ElementRef, Renderer, ViewChild} from '@angular/core';
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
  nihlogosrc = 'assets/images/nihlogo.png';

  listSize: number = this.getListSize();
  changeTimer = 20;
  pageNr = 0;
  showSchedule = false;
  rotationStarted = false;

  newsReelList: Array<String> = [];
  newsReelContent = '';
  @ViewChild('newsReelItem') newsReelEle: ElementRef;
  private newsReelEleLeft = 0;
  private newsReelEleLeftString = '0px';
  private newsInterval: any;

  constructor(private socketService: SocketService, private renderer: Renderer) {}

  ngOnInit() {
    this.socketService.on('init', (data) => {
      console.log('score change received from server:\n');
      console.log(data);
      this.score = data.score;
      this.newsReelList = data.news;
      this.rotationStarted = data.rotationStarted;

      this.changeView();
      this.startRotation();
      this.executeNewsReel();
      this.startReloadInterval();
    });
    this.socketService.on('score_change', (new_score) => {
      console.log('score change received from server:\n');
      console.log(new_score);
      this.score = new_score;
    });
    this.socketService.on('rotation_change', (rotation_status) => {
      console.log('new rotation status received from server: ' + rotation_status);
      this.rotationStarted = rotation_status;
    });
    this.socketService.on('new_news', (new_news) => {
      console.log('new news item received from server: ' + new_news);
      this.newsReelList.unshift(new_news);
      if (this.newsReelList.length > 4) { // there should only be four elements in news reel
        this.newsReelList.pop();
      }
    });
  }

  ngOnDestroy() {
    this.socketService.off('score_change');
  }

  private startRotation (): void {
    // rotation interval
    setInterval(() => {
      this.changeView();
    }, this.changeTimer * 1000);
  }

  // change view logic. We are assuming that there are only two pages of score
  private changeView(): void {
    if (this.pageNr === 0) {
      this.showSchedule = false;
      this.shownScore = this.score.slice(0, this.listSize);
    } else if (this.pageNr === 1) {
      this.shownScore = this.score.slice(this.listSize, this.score.length);
    } else { // pageNr is 2
      this.showSchedule = true;
    }
    this.changePageNr();
  }

  private getListSize(): number {
    // get pagelength
    const PageHeight: number = window.screen.height - 200;
    const contentHeight = 60;
    return Math.floor(PageHeight / contentHeight) - 1;
  }

  private changePageNr() {
    this.pageNr += 1;
    if (this.pageNr === 3) {
      this.pageNr = 0;
    }
  }

  private executeNewsReel() {
    if (this.newsReelList.length !== 0) {
      // init element with text from newsReelArray
      this.newsReelContent += '*          ';
      for (const item of this.newsReelList) {
        this.newsReelContent += item;
        this.newsReelContent += '          *          ';
      }

      // place it length plus a few pixel to the left, so it starts outside the screen
      const len = this.newsReelContent.length * 20; // a nice approximation I think :)
      this.newsReelEleLeft = window.innerWidth;
      this.newsReelEleLeftString = this.newsReelEleLeft + 'px';

      // start moving it across the screen
      this.newsInterval = setInterval(() => {
        this.newsReelEleLeft -= 1;
        this.newsReelEleLeftString = this.newsReelEleLeft + 'px';

        // end newsreel when content is beyond screen
        if (this.newsReelEleLeft + len < 0) {
          this.newsReelContent = '';
          clearInterval(this.newsInterval);

          // start new newsreel
          this.executeNewsReel();
        }
      }, 10);
    } else {
      setTimeout(() => {
        this.executeNewsReel();
      }, 1000);
    }
  }

  private startReloadInterval() {
    setTimeout(() => {
      location.reload();
    }, 20 * 60 * 1000);
  }
}
