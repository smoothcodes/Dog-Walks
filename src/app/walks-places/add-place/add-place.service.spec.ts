import { TestBed } from '@angular/core/testing';

import { AddPlaceService } from './add-place.service';

describe('AddPlaceService', () => {
  let service: AddPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
