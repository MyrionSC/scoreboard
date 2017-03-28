import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css'],
  providers: [SocketService]
})
export class AdminComponentComponent implements OnInit {

  private testdata: Array<any> = [
    {
      "activity": "længdespring",
      "team": "hold1",
      "time": 90
    },
    {
      "activity": "vikingespil",
      "team": "hold2",
      "time": 32
    },
    {
      "activity": "svømning",
      "team": "hold3",
      "time": 42
    },
    {
      "activity": "blah",
      "team": "hold4",
      "time": 80.234
    }
  ];

  constructor(private socketService: SocketService) { }

  ngOnInit() {

  }

  changeScore():void {
    this.socketService.emit("new_score", this.testdata)
  }
}
