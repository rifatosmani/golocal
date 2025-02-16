import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ChatComponent implements OnInit {
  @Input() user: any; // Receive the user as an input parameter

  public messages: Array<any> = []; // Mock chat messages
  public stompClient:any;
  constructor() {
  }

  ngOnInit() {
    console.log('Chat started with user:', this.user);
    this.connect();
  }

  sendMessage(input: any) {
    
    console.log(this.messages);
    let user:any = localStorage.getItem('user');
    console.log(user.username);
    this.messages.push({text:input.value,sender:JSON.parse(user).username});

    if(user != null){
      user = JSON.parse(user);
      console.log(user);
      console.log(input);
      if (input.value.trim()) {
        this.stompClient.send(
          "/app/message",
          {},
          JSON.stringify({
            senderName:user.username,
            receiverName:this.user.username,
            status:'MESSAGE',
            media:null,
            message:input.value
          })
        )
      }
    }
    input.value = '';
  }

  connect = () => {
    let sock = new SockJS("chat-ws");
    this.stompClient = Stomp.over(() => sock);
    let authToken  = localStorage.getItem('accessToken');
    this.stompClient.connect(
      { Authorization: `Bearer ${authToken}` }, // Add your token here
      this.onConnect,
      this.onError
    );
  };
  onConnect = () => {
    console.log("Connected");
    let user:any = localStorage.getItem('user');
    console.log(JSON.parse(user).username);

    this.stompClient.subscribe('/user/'+JSON.parse(user).username +'/private', this.onMessageReceived);
    //userJoin();
  };
  onError = (err:any) => {
    console.log("err=>", err);
  };

  onMessageReceived = (payload:any) => {
    const payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    this.messages.push();
    this.messages.push({text:payloadData.message,sender:payloadData.senderName});

    switch (payloadData.status) {
      /*
      case "JOIN":
        if (payloadData.senderName != 'username') {
          if (!privateChats.get(payloadData.senderName)) {
            privateChats.set(payloadData.senderName, []);
            setPrivateChats(new Map(privateChats));
          }
        }
        break;
      case "LEAVE":
        if (payloadData.senderName != username) {
          if (privateChats.get(payloadData.senderName)) {
            privateChats.delete(payloadData.senderName);
            setPrivateChats(new Map(privateChats));
          }
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats((prev) => [...prev, payloadData]);
        */
    }
  };
}
