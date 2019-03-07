import { Component, OnInit, ViewChild } from '@angular/core';
import { Content } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(Content) contentArea: Content;
  message: string = '';
  allChatMessages: any = [];
  userInfo: any;
  senderId: number = 0;
  userId: number = 0;
  receiverName: string = '';
  eventId: number = 0;
  receiveMsgInterval:any;
  constructor(
    private restService: RestService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.senderId = params['id'];
      this.receiverName = params['name'];
      this.eventId = params['eventId'];
    });
   }

  async ngOnInit() {
    this.contentArea.scrollToBottom();
    this.userInfo = await this.restService.getStorage("userInfo");
    this.userId = this.userInfo['id'];
    this.allMessages();
  }

  ngOnDestroy() {
    clearInterval(this.receiveMsgInterval);
  }

  receiveMessages = async () => {
    let requestData;
    if(this.senderId>0){
      requestData = {
        app_action: "app_receive_message",
        s_id: this.senderId,
        r_id: this.userInfo['id'],
        e_id: this.eventId
      }
    } else {
      requestData = {
        app_action: "app_group_receive_message",
        r_id: this.userInfo['id'],
        e_id: this.eventId
      }
    }
    let result = await this.restService.makeGetRequest(requestData);
    if (!result['app_error']) {
      if(this.senderId>0){
        for(var i=0; i<result['app_checkin_users'].length;i++){
          result['app_checkin_users'][i]['created_date'] = new Date(result['app_checkin_users'][i]['created_date']+' UTC');
          this.allChatMessages.push(result['app_checkin_users'][i]);
        }
      } else {
        for(var i=0; i<result['app_group_receive_message'].length;i++){
          result['app_group_receive_message'][i]['created_date'] = new Date(result['app_group_receive_message'][i]['created_date']+' UTC');
          this.allChatMessages.push(result['app_group_receive_message'][i]);
        }
      }
      console.log(this.allChatMessages);
      setTimeout(()=>{this.contentArea.scrollToBottom();},200);
    }
  }

  allMessages = async () => {
    let requestData;
    if(this.senderId>0){
      requestData = {
        app_action: "app_all_message",
        s_id: this.senderId,
        r_id: this.userInfo['id'],
        e_id: this.eventId
      }
    } else {
      requestData = {
        app_action: "app_group_all_message",
        r_id: this.userInfo['id'],
        e_id: this.eventId
      }
    }
    let result = await this.restService.makeGetRequest(requestData);
    if (!result['app_error']) {
      if(this.senderId>0){
        for(var i=0; i<result['app_checkin_users'].length;i++){
          result['app_checkin_users'][i]['created_date'] = new Date(result['app_checkin_users'][i]['created_date']+' UTC');
          this.allChatMessages.push(result['app_checkin_users'][i]);
        }
      } else {
        for(var i=0; i<result['app_group_receive_message'].length;i++){
          result['app_group_receive_message'][i]['created_date'] = new Date(result['app_group_receive_message'][i]['created_date']+' UTC');
          this.allChatMessages.push(result['app_group_receive_message'][i]);
        }
      }
      setTimeout(()=>{this.contentArea.scrollToBottom();},200);
    }
    this.receiveMsgInterval = setInterval(()=>{
      this.receiveMessages();
    }, 1000);
  }

  send = async () => {
    let requestData;
    if(this.senderId>0){
      requestData = {
        app_action: "app_send_message",
        s_id: this.userInfo['id'],
        r_id: this.senderId,
        e_id: this.eventId,
        msg: this.message
      }
    } else {
      requestData = {
        app_action: "app_send_group_message",
        s_id: this.userInfo['id'],
        e_id: this.eventId,
        msg: this.message
      }
    }
    let result = await this.restService.makePostRequest(requestData);
    if (!result['app_error']) {
      let msgArray = {
        message: this.message,
        sender_id: this.userId,
        receiver_id: this.senderId,
        created_date: new Date()
      }
      this.message = '';
      this.allChatMessages.push(msgArray);
      console.log(this.allChatMessages);
      this.message = '';
      setTimeout(()=>{this.contentArea.scrollToBottom();},200);
    }
  }

}
