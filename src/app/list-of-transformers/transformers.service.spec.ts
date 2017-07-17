import { TestBed, inject } from '@angular/core/testing';

import { TransformersServiceService } from './transformers.service';

describe('TransformersServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformersServiceService]
    });
  });

  it('should be created', inject([TransformersServiceService], (service: TransformersServiceService) => {
    expect(service).toBeTruthy();
  }));
});
