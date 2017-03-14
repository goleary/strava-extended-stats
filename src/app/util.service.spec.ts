/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilServiceService } from './util-service.service';

describe('UtilServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilServiceService]
    });
  });

  it('should ...', inject([UtilServiceService], (service: UtilServiceService) => {
    expect(service).toBeTruthy();
  }));
});
