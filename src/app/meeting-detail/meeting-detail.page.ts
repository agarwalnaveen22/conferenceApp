import { Component, OnInit } from '@angular/core';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { RestService } from '../services/rest.service';
import { CommonService } from '../services/common.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.page.html',
  styleUrls: ['./meeting-detail.page.scss'],
})
export class MeetingDetailPage implements OnInit {
  headerImg: string = '';
  items: any = [1, 2, 3, 4, 5];
  jsonData: any = {};
  isCheckedIn: boolean = false;
  eventId: number = 0;
  eventDetail: any;
  userInfo: any;
  constructor(
    private selector: WheelSelector,
    private restService: RestService,
    private commonService: CommonService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.eventId = params['id'];
      this.getEventDetail();
    });
    let hours = [
      {
        description: 'Hours'
      }
    ];
    for (var i = 0; i <= 23; i++) {
      let h = i < 10 ? '0' + i : i;
      let hour = {
        description: h.toString()
      }
      hours.push(hour);
    }
    this.jsonData['Hours'] = hours;

    let minutes = [
      {
        description: 'Minutes'
      }
    ];
    for (var i = 0; i <= 59; i++) {
      let m = i < 10 ? '0' + i : i;
      let minute = {
        description: m.toString()
      }
      minutes.push(minute);
    }
    this.jsonData['Minutes'] = minutes;
  }

  async ngOnInit() {
    this.userInfo = await this.restService.getStorage("userInfo");
  }

  getEventDetail = async () => {
    await this.restService.showLoader('Fetching event details...');
    let requestData = {
      app_action: "app_today_events",
      es_id: this.eventId
    }
    let result = await this.restService.makeGetRequest(requestData);
    this.restService.hideLoader();
    if (!result['app_error']) {
      this.eventDetail = result['app_user'];
      this.headerImg = this.eventDetail['event']['event_image'];
      console.log(this.headerImg);
    } else {
      this.restService.showAlert('Error', result['app_message']);
    }
  }

  selectReminderTime = () => {
    this.selector.show({
      title: "Before?",
      items: [
        this.jsonData.Hours, this.jsonData.Minutes
      ],
      positiveButtonText: "Ok",
      negativeButtonText: "Nope"
    }).then(
      async (result) => {
        if (result[0]['description'] == "Hours" || result[1]['description'] == "Minutes") {
          await this.restService.showToast("Please select correct time");
        } else {
          await this.restService.showLoader('Setting reminder...');
          let requestData = {
            app_action: "app_reminder",
            uid: this.userInfo['id'],
            eid: this.eventId,
            hours: result[0]['description'],
            minute: result[1]['description']
          }
          let resp = await this.restService.makePostRequest(requestData);
          this.restService.hideLoader();
          if (!resp['app_error']) {
            await this.restService.showToast("Reminder set successfully.");
          } else {
            this.restService.showAlert('Error', resp['app_message']);
          }
        }
      },
      err => alert('Error: ' + JSON.stringify(err))
    );
  }

  checkIn = async () => {
    if (!this.isCheckedIn) {
      await this.restService.showLoader('Checking in...');
      let requestData = {
        app_action: "app_checkin",
        uid: this.userInfo['id'],
        eid: this.eventId
      }
      let result = await this.restService.makePostRequest(requestData);
      this.restService.hideLoader();
      if (!result['app_error']) {
        this.isCheckedIn = true;
      } else {
        this.isCheckedIn = false;
        this.restService.showAlert('Error', result['app_message']);
      }
    } else {
      await this.restService.showToast("You are already checked In");
    }
  }

}
