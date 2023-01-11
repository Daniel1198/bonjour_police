import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRechercheComponent } from './profil-recherche.component';

describe('ProfilRechercheComponent', () => {
  let component: ProfilRechercheComponent;
  let fixture: ComponentFixture<ProfilRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilRechercheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
