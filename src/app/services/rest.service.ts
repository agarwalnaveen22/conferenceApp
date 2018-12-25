import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiUrl = 'https://www.workapproval.com/php_pdo/API/rest.php';
  loading: any;
  alert: any;

  constructor(
    public http: HttpClient,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    private storage: Storage
  ) { }

  async showLoader(message) {
    this.loading = await this.loadingController.create({
      message: message
    });
    await this.loading.present();
    return;
  }

  hideLoader() {
    this.loading.dismiss();
  }

  async showAlert(header, message) {
    this.alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await this.alert.present();
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    await toast.present();
  }

  async setStorage(key, value) {
    return await this.storage.set(key, value);
  }

  async getStorage(key) {
    let promise = new Promise((resolve) => {
      this.storage.get(key).then((val) => {
        resolve(val);
      })
    })
    return await promise;
  }

  async removeStorage(key) {
    return await this.storage.remove(key);
  }

  setUrl(requestData) {
    return Object.keys(requestData).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(requestData[key]);
    }).join('&');
  }

  setErrorMessageArray(msg) {
    return msg.join("<br/>");
  }

  async makeGetRequest(data) {
    return await new Promise((resolve) => {
      this.http.get(this.apiUrl, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        params: data
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          this.handleException(err);
        });
    });
  }

  async makePostRequest(data) {
    data = this.setUrl(data);
    let promise =  new Promise((resolve) => {
      this.http.post(this.apiUrl, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          this.handleException(err);
        });
    });
    return await promise;
  }

  async handleException(err){
    if (err.error) {
      await this.showToast(this.setErrorMessageArray(err.error.message));
    } else {
      await this.showToast(err.statusText);
    }
  }
}
