import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFichePoliceComponent } from './add-fiche-police.component';

describe('AddFichePoliceComponent', () => {
  let component: AddFichePoliceComponent;
  let fixture: ComponentFixture<AddFichePoliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFichePoliceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFichePoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
