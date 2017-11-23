import { TestBed, inject } from '@angular/core/testing';

import { RoutemapService } from './routemap.service';

describe('RoutemapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutemapService]
    });
  });

  it('should be created', inject([RoutemapService], (service: RoutemapService) => {
    expect(service).toBeTruthy();
  }));
});
