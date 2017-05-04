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
    // this.socketService.on('score_init', (server_score) => {
    //   console.log("score change received from server:\n");
    //   console.log(server_score);
    //   this.score = server_score;
    //
    //   this.changeView();
    //   setInterval(() => {
    //     this.onFirstPage = !this.onFirstPage;
    //     this.changeView();
    //   }, this.changeTimer * 1000);
    // });
    // this.socketService.on('score_change', (new_score) => {
    //   console.log("score change received from server:\n");
    //   console.log(new_score);
    //   this.score = new_score;
    // });

    // while testing
    // this.score = [{"activity":"aktivitet1","team":"hold1","time":10},{"activity":"aktivitet2","team":"hold2","time":20},{"activity":"aktivitet3","team":"hold3","time":30},{"activity":"aktivitet4","team":"hold4","time":40}
    // ,{"activity":"aktivitet5","team":"hold1","time":10},{"activity":"aktivitet6","team":"hold2","time":20},{"activity":"aktivitet7","team":"hold3","time":30},{"activity":"aktivitet8","team":"hold4","time":40}
    // ,{"activity":"aktivitet9","team":"hold1","time":10},{"activity":"aktivitet10","team":"hold2","time":20},{"activity":"aktivitet11","team":"hold3","time":30},{"activity":"aktivitet12","team":"hold4","time":40}
    // ,{"activity":"aktivitet13","team":"hold1","time":10},{"activity":"aktivitet14","team":"hold2","time":20},{"activity":"aktivitet15","team":"hold3","time":30},{"activity":"aktivitet16","team":"hold4","time":40}];

    // new testdata:
    this.score = [
      {"activity": "activity1", "goldTeam": "Gold blah", "goldScore": "Gold Score 1ssdd", "silverTeam": "Silver Team 1", "silverScore": "Silver Score 1", "bronzeTeam": "Bronze Team 1", "bronzeScore": "Bronze Score 1"},
      {"activity": "activity2", "goldTeam": "Gold Team 2 sssdddddddddddddddd", "goldScore": "Gol 2", "silverTeam": "Silver Team 2", "silverScore": "Silver Score 2", "bronzeTeam": "Bronze Team 2", "bronzeScore": "Bronze Score 2"},
      {"activity": "activity3", "goldTeam": "Gold Team 3", "goldScore": "Gold Score 3", "silverTeam": "Silver Team 3", "silverScore": "Silver Score 3", "bronzeTeam": "Bronze Team 3", "bronzeScore": "Bronze Score 3"},
      {"activity": "activity4", "goldTeam": "Gold Team 4", "goldScore": "Gold Score 4", "silverTeam": "Silver Team 4", "silverScore": "Silver Score 4", "bronzeTeam": "Bronze Team 4", "bronzeScore": "Bronze Score 4"},
      {"activity": "activity5", "goldTeam": "Gold Team 5", "goldScore": "Gold Score 5", "silverTeam": "Silver Team 5", "silverScore": "Silver Score 5", "bronzeTeam": "Bronze Team 5", "bronzeScore": "Bronze Score 5"},
      {"activity": "activity6", "goldTeam": "Gold Team 6", "goldScore": "Gold Score 6", "silverTeam": "Silver Team 6", "silverScore": "Silver Score 6", "bronzeTeam": "Bronze Team 6", "bronzeScore": "Bronze Score 6"},
      {"activity": "activity7", "goldTeam": "Gold Team 7", "goldScore": "Gold Score 7", "silverTeam": "Silver Team 7", "silverScore": "Silver Score 7", "bronzeTeam": "Bronze Team 7", "bronzeScore": "Bronze Score 7"},
      {"activity": "activity8", "goldTeam": "Gold Team 8", "goldScore": "Gold Score 8", "silverTeam": "Silver Team 8", "silverScore": "Silver Score 8", "bronzeTeam": "Bronze Team 8", "bronzeScore": "Bronze Score 8"},
      {"activity": "activity9", "goldTeam": "Gold Team 9", "goldScore": "Gold Score 9", "silverTeam": "Silver Team 9", "silverScore": "Silver Score 9", "bronzeTeam": "Bronze Team 9", "bronzeScore": "Bronze Score 9"},
      {"activity": "activity10", "goldTeam": "Gold Team 10", "goldScore": "Gold Score 10", "silverTeam": "Silver Team 10", "silverScore": "Silver Score 10", "bronzeTeam": "Bronze Team 10", "bronzeScore": "Bronze Score 10"},
      {"activity": "activity11", "goldTeam": "Gold Team 11", "goldScore": "Gold Score 11", "silverTeam": "Silver Team 11", "silverScore": "Silver Score 11", "bronzeTeam": "Bronze Team 11", "bronzeScore": "Bronze Score 11"},
      {"activity": "activity12", "goldTeam": "Gold Team 12", "goldScore": "Gold Score 12", "silverTeam": "Silver Team 12", "silverScore": "Silver Score 12", "bronzeTeam": "Bronze Team 12", "bronzeScore": "Bronze Score 12"},
      {"activity": "activity13", "goldTeam": "Gold Team 13", "goldScore": "Gold Score 13", "silverTeam": "Silver Team 13", "silverScore": "Silver Score 13", "bronzeTeam": "Bronze Team 13", "bronzeScore": "Bronze Score 13"},
      {"activity": "activity14", "goldTeam": "Gold Team 14", "goldScore": "Gold Score 14", "silverTeam": "Silver Team 14", "silverScore": "Silver Score 14", "bronzeTeam": "Bronze Team 14", "bronzeScore": "Bronze Score 14"},
      {"activity": "activity15", "goldTeam": "Gold Team 15", "goldScore": "Gold Score 15", "silverTeam": "Silver Team 15", "silverScore": "Silver Score 15", "bronzeTeam": "Bronze Team 15", "bronzeScore": "Bronze Score 15"},
      {"activity": "activity16", "goldTeam": "Gold Team 16", "goldScore": "Gold Score 16", "silverTeam": "Silver Team 16", "silverScore": "Silver Score 16", "bronzeTeam": "Bronze Team 16", "bronzeScore": "Bronze Score 16"}
    ];


    this.changeView();
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
