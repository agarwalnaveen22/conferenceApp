import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.page.html',
  styleUrls: ['./meeting-detail.page.scss'],
})
export class MeetingDetailPage implements OnInit {
  headerImg: string = 'https://www.workapproval.com/php_pdo/images/event_image/548981download.jpg';
  items: any = [1,2,3,4,5];
  constructor() { }

  ngOnInit() {
  }

}
