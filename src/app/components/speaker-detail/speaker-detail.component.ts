import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss']
})
export class SpeakerDetailComponent implements OnInit {
  speakerId: number = 0;
  speakerDetail: any;
  constructor(
    private modalCtrl: ModalController,
    private restService: RestService,
    private navParams: NavParams
  ) {
    this.speakerId = navParams.get("speakerId");
   }

  ngOnInit() {
    this.getSpeakerDetail();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  getSpeakerDetail = async () => {
    await this.restService.showLoader('Fetching speaker details...');
    let requestData = {
      app_action: "app_speaker_details",
      es_id: this.speakerId
    }
    let result = await this.restService.makeGetRequest(requestData);
    this.restService.hideLoader();
    if (!result['app_error']) {
      this.speakerDetail = result['app_user']['event_speaker'];
    } else {
      this.restService.showAlert('Error', result['app_message']);
    }
  }

}
