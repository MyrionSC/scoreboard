import {Component, OnInit, ElementRef, Renderer, ViewChild} from '@angular/core';
import { SocketService } from '../socket.service';
import {Score} from '../score';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
  providers: [SocketService]
})
export class ScoreboardComponent implements OnInit {
  score: Score;
  nihlogosrc = 'assets/images/nihlogo.png';

  newsReelContent = '';
  @ViewChild('newsReelItem') newsReelEle: ElementRef;
  newsReelEleLeft = 0;
  newsReelEleLeftString = '0px';
  newsInterval: any;


  constructor(private socketService: SocketService, private renderer: Renderer) {
    this.score = new Score();
  }

  ngOnInit() {
    this.socketService.on('init', (data) => {
      console.log('score change received from server:\n');
      console.log(data);
      this.score = data.score;
      this.newsReelContent = data.news;

      // this.executeNewsReel();
      this.startReloadInterval();
    });
    this.socketService.on('score_change', (new_score) => {
      console.log('score change received from server:\n');
      console.log(new_score);
      this.score = new_score;
    });
    this.socketService.on('new_news', (new_news) => {
      console.log('new news item received from server: ' + new_news);
      this.newsReelContent = new_news;
    });
  }

  private executeNewsReel() {
    if (this.newsReelContent.length !== 0) {
      // place it length plus a few pixel to the left, so it starts outside the screen
      this.newsReelEleLeft = window.innerWidth;
      this.newsReelEleLeftString = this.newsReelEleLeft + 'px';

      // start moving it across the screen
      this.newsInterval = setInterval(() => {
        this.newsReelEleLeft -= 1;
        this.newsReelEleLeftString = this.newsReelEleLeft + 'px';

        // end newsreel when content is beyond screen
        if (this.newsReelEleLeft + this.newsReelContent.length * 20 < 0) {
          clearInterval(this.newsInterval);

          // start new newsreel
          setTimeout(() => {
            this.executeNewsReel();
          }, 1000);
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
