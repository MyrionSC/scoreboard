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

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.on('score_change', (new_score) => {
      console.log("score change received from server:\n");
      console.log(new_score);
      this.score = new_score;
    });
  }
  ngOnDestroy() {
    this.socketService.off('score_change');
  }
}
