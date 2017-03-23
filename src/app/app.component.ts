import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private socket = io();

  





// test data
//   dataarr = [
//   {
//     "activity": "længdespring",
//     "team": "hold1",
//     "time": 90
//   },
//   {
//     "activity": "vikingespil",
//     "team": "hold2",
//     "time": 32
//   },
//   {
//     "activity": "svømning",
//     "team": "hold3",
//     "time": 42
//   },
//   {
//     "activity": "blah",
//     "team": "hold4",
//     "time": 80.234
//   }
// ];



  // socket.on('score_change', function(msg){
  //   // $('#messages').append($('<li>').text(msg));
  //   console.log(msg);
  // });

  // data = [1,2,3,4,5,6,7,];
}


