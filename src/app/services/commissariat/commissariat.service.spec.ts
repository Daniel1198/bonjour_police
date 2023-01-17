import { TestBed } from '@angular/core/testing';

import { CommissariatService } from './commissariat.service';

describe('CommissariatService', () => {
  let service: CommissariatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissariatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
