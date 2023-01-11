import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheHebergementComponent } from './fiche-hebergement.component';

describe('FicheHebergementComponent', () => {
  let component: FicheHebergementComponent;
  let fixture: ComponentFixture<FicheHebergementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheHebergementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheHebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
