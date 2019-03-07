import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { NavController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {

  signature = '';
  isDrawing = false;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 300,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  constructor(
    private navCtrl: NavController,
    private transfer: FileTransfer,
    private restService: RestService
  ) { }

  ngOnInit() {
  }

  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    this.signaturePad.clear();
    this.uploadSignature();
  }
 
  clearPad() {
    this.signaturePad.clear();
  }

  async uploadSignature() {
    let response = await this.restService.getStorage("userInfo");
    let options: FileUploadOptions = {
      fileKey: 'uploadFileName',
      fileName: 'name.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data"
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    await this.restService.showLoader('Sending Signature...');
    let result = await fileTransfer.upload(this.signature, this.restService.apiUrl + "?app_action=app_user_image_update&id=" + response["id"], options);
    this.restService.hideLoader();
    result = JSON.parse(result.response);
    if(!result['app_error']){
      this.navCtrl.navigateForward("/personal-info");
    } else {
      this.restService.showAlert('Error', result['app_message']);
    }
  }

}
