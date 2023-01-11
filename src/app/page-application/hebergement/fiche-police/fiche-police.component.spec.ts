import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePoliceComponent } from './fiche-police.component';

describe('FichePoliceComponent', () => {
  let component: FichePoliceComponent;
  let fixture: ComponentFixture<FichePoliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichePoliceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichePoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
