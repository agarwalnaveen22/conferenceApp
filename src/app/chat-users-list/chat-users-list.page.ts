import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat-users-list',
  templateUrl: './chat-users-list.page.html',
  styleUrls: ['./chat-users-list.page.scss'],
})
export class ChatUsersListPage implements OnInit {
  users: any = [];
  eventId: number = 0;
  userInfo:any;
  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.route.params.subscribe((params: Params) => {
      this.eventId = params['id'];
    });
  }

  async ngOnInit() {
    this.userInfo = await this.restService.getStorage("userInfo");
    this.getOnlineUsers();
  }

  goToChat = (id, firstName) => {
    this.navCtrl.navigateForward("/chat/"+id+"/"+firstName+"/"+this.eventId);
  }

  getOnlineUsers = async () => {
    await this.restService.showLoader('Fetching users...');
    let requestData = {
      app_action: "app_checkin_users",
      eid: this.eventId,
      uid: this.userInfo['id']
    }
    let result = await this.restService.makeGetRequest(requestData);
    this.restService.hideLoader();
    if (!result['app_error']) {
      this.users = result['app_checkin_users']
    } else {
      this.restService.showAlert('Error', result['app_message']);
    }
  }

}
