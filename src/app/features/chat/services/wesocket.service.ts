import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, CompatClient, Frame, Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient?: CompatClient;

  connect(sock:any, onConnect: () => void, onError: (error: any) => void): Client {
    this.stompClient = Stomp.over(sock);
    this.stompClient.activate();
    return this.stompClient;
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
