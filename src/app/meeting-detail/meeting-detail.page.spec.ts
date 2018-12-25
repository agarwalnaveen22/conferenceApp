import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDetailPage } from './meeting-detail.page';

describe('MeetingDetailPage', () => {
  let component: MeetingDetailPage;
  let fixture: ComponentFixture<MeetingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
