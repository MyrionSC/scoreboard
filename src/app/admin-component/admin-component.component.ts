import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import {Score} from '../score';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css'],
  providers: [SocketService]
})
export class AdminComponentComponent implements OnInit {
  score: Score;
  news: String;

  constructor(private socketService: SocketService) {
    this.score = new Score();
  }

  ngOnInit() {
    this.socketService.on('init', (data) => {
      console.log('score received from server:\n');
      console.log(data);
      this.score = data.score;
      this.news = data.news;
    });
  }

  pushNews () {
    this.socketService.emit('new_news', this.news);
  }

  saveScore(): void {
    console.log('Saving score');
    console.log(this.score);

    this.socketService.emit('new_score', this.score);
  }
}
