import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  membershipCode: String = '';
  constructor(
    private navCtrl: NavController,
    private restService: RestService
  ) { }

  ngOnInit() {
  }

  async login() {
    if (this.membershipCode == '') {
      this.restService.showToast('Please enter membership code');
    } else {
      await this.restService.showLoader('Logging in...');
      let requestData = {
        app_action: "app_login",
        ms_code: this.membershipCode
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
