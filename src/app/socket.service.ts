import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket = io();

  constructor() {
    this.socket.connect();
  }

  emit(emitStr: string, data: any): void {
    this.socket.emit(emitStr, data)
  }

  on(onStr: string, callback: any): void {
    this.socket.on(onStr, callback);
  }
  off(offStr: string): void {
    this.socket.off(offStr);
  }

}
