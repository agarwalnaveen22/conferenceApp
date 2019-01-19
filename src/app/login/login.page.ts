import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  membershipCode: String = '';
  constructor(
    private navCtrl: NavController,
    private restService: RestService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  async login() {
    if (this.membershipCode == '') {
      this.restService.showToast('Please enter membership code');
    } else {
      let fcmToken = await this.commonService.getFCMToken();
      let deviceInfo = this.commonService.getDeviceInfo();
      await this.restService.showLoader('Logging in...');
      let requestData = {
        app_action: "app_login",
        ms_code: this.membershipCode,
        device_id: deviceInfo.deviceUuid,
        devices_platform: deviceInfo.devicePlatform,
        device_token: fcmToken
      }
      let result = await this.restService.makePostRequest(requestData);
      this.restService.hideLoader();
      if (!result['app_error']) {
        let response = await this.restService.setStorage("userInfo", result['app_user']);
        if (response) {
          this.navCtrl.navigateForward("/signature");
        }
      } else {
        this.membershipCode = '';
        this.restService.showAlert('Error', result['app_message']);
      }
    }
  }

}
