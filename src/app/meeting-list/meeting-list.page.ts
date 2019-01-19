import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.page.html',
  styleUrls: ['./meeting-list.page.scss'],
})
export class MeetingListPage implements OnInit {
  events: any = [];
  constructor(
    private restService: RestService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getEventList();
  }

  getEventList = async () => {
    await this.restService.showLoader('Getting today\'s events...');
    let requestData = {
      app_action: "app_today_events"
    }
    let result = await this.restService.makeGetRequest(requestData);
    this.restService.hideLoader();
    if (!result['app_error']) {
      this.events = result['app_user'];
    } else {
      this.restService.showAlert('Error', result['app_message']);
    }
  }

  goToPage = () => {
    this.navCtrl.navigateForward("/meeting-detail/"+this.events.event.event_id);
  }

}
