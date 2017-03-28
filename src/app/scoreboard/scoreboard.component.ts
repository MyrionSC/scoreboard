import {Component, OnInit, OnDestroy} from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
  providers: [SocketService]
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  score: Array<any> = [
    {
      "activity": "læncxcvxcvpring",
      "team": "ddd",
      "time": 4033
    },
    {
      "activity": "ggggggggggggggggggg",
      "team": "ccbbb",
      "time": 34.234
    }
  ];


  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.on('score_change', (new_score) => {
      console.log("score change received from server:\n");
      console.log(new_score);
      this.score = new_score;
    });
    // setTimeout(() => {
    //   console.log("updating view hopefully");
    //   this.change_score();
    // }, 3000);
  }

  // change_score(new_score: any) {
  //   console.log("score change received from server:\n");
  //   console.log(new_score);
  //   this.score = new_score;
  //   this.cdref.detectChanges();
  //   // this.score = [
  //   //   {
  //   //     "activity": "længdespring",
  //   //     "team": "hold1",
  //   //     "time": 40
  //   //   },
  //   //   {
  //   //     "activity": "blah",
  //   //     "team": "hold4",
  //   //     "time": 30.234
  //   //   }
  //   // ];
  // }

  ngOnDestroy() {
    this.socketService.off('score_change');
  }
}
