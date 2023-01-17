import { TestBed } from '@angular/core/testing';

import { HebergeurService } from './hebergeur.service';

describe('HebergeurService', () => {
  let service: HebergeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HebergeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
