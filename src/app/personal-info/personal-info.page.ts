import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  firstName: String = '';
  lastName: String = '';
  memberNumber: String = '';
  company: String = '';
  emailAddress: String = '';
  userInfo: any;
  constructor(
    private navCtrl: NavController,
    private restService: RestService
  ) { }

  async ngOnInit() {
    this.userInfo = await this.restService.getStorage("userInfo");
    this.firstName = this.userInfo['first_name'];
    this.lastName = this.userInfo['last_name'];
    this.memberNumber = this.userInfo['mobile'];
    this.company = this.userInfo['company_name'];
    this.emailAddress = this.userInfo['email'];
  }

  async update() {
    await this.restService.showLoader('Updating details...');
    let requestData = {
      app_action: "app_user_detail_update",
      first_name: this.firstName,
      last_name: this.lastName,
      mobile: this.memberNumber,
      company_name: this.company,
      email: this.emailAddress,
      id: this.userInfo['id']
    }
    let result = await this.restService.makePostRequest(requestData);
    this.restService.hideLoader();
    if (!result['app_error']) {
      let response = await this.restService.setStorage("userInfo", result['app_user']);
      if (response) {
        this.navCtrl.navigateForward("/meeting-list");
      }
    } else {
      this.restService.showAlert('Error', result['app_message']);
    }
  }

}
