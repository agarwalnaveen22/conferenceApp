import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePage } from './signature.page';

describe('SignaturePage', () => {
  let component: SignaturePage;
  let fixture: ComponentFixture<SignaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
