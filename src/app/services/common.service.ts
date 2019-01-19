import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Device } from '@ionic-native/device/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private fcm: FCM,
    private device: Device
  ) { }

  getFCMToken = async () => {
    this.fcm.subscribeToTopic('reminder');
    let token = await this.fcm.getToken();
    return token;
  }

  getDeviceInfo = () => {
    let info = {
      deviceUuid: this.device.uuid,
      devicePlatform: this.device.platform
    }
    return info;
  }
}
