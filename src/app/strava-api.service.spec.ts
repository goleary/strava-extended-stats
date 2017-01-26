/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StravaApiService } from './strava-api.service';

describe('StravaApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StravaApiService]
    });
  });

  it('should ...', inject([StravaApiService], (service: StravaApiService) => {
    expect(service).toBeTruthy();
  }));
});
