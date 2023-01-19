import { TestBed } from '@angular/core/testing';

import { ProfilRechercheService } from './profil-recherche.service';

describe('ProfilRechercheService', () => {
  let service: ProfilRechercheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilRechercheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
