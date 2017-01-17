/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StravaAuthComponent } from './strava-auth.component';

describe('StravaAuthComponent', () => {
  let component: StravaAuthComponent;
  let fixture: ComponentFixture<StravaAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StravaAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StravaAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
