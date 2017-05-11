import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../socket.service';
import {Activity} from '../activity';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css'],
  providers: [SocketService]
})
export class AdminComponentComponent implements OnInit, OnDestroy {
  private score: Array<Activity>;
  private oldScore: Array<Activity>;
  private latestNews: String;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.on('init', (data) => {
      console.log('score received from server:\n');
      console.log(data);
      this.score = this.copyArray(data.score);
      this.oldScore = this.copyArray(data.score);
      }
    );
  }

  ngOnDestroy () {
    this.socketService.off('score_change');
  }

  pushNews () {
    this.socketService.emit('new_news', this.latestNews);
    this.latestNews = '';
  }

  addActivity () {
    this.score.push(new Activity());
  }
  removeActivity (ac: Activity) {
    const index: number = this.score.indexOf(ac);
    if (index !== -1) {
      this.score.splice(index, 1);
    }
  }

  saveScore(): void {
    console.log('Saving score');
    console.log(this.score);
    this.oldScore = this.copyArray(this.score);

    this.socketService.emit('new_score', this.score);
  }
  revertChanges():void {
    console.log('reverting changes');
    this.score = this.copyArray(this.oldScore);
  }

  private copyArray (ar: Array<Activity>): Array<Activity> {
    // roundabout way to get copy by value instead of copy by reference
    return JSON.parse(JSON.stringify(ar));
  }
}
