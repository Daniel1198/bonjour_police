import { TestBed } from '@angular/core/testing';

import { FichePoliceService } from './fiche-police.service';

describe('FichePoliceService', () => {
  let service: FichePoliceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichePoliceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
