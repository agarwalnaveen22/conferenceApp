import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUsersListPage } from './chat-users-list.page';

describe('ChatUsersListPage', () => {
  let component: ChatUsersListPage;
  let fixture: ComponentFixture<ChatUsersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUsersListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUsersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
