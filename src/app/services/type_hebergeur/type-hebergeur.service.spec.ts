import { TestBed } from '@angular/core/testing';

import { TypeHebergeurService } from './type-hebergeur.service';

describe('TypeHebergeurService', () => {
  let service: TypeHebergeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeHebergeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
