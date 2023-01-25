import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondanceProfilComponent } from './correspondance-profil.component';

describe('CorrespondanceProfilComponent', () => {
  let component: CorrespondanceProfilComponent;
  let fixture: ComponentFixture<CorrespondanceProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrespondanceProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrespondanceProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
