import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHebergeurComponent } from './add-hebergeur.component';

describe('AddHebergeurComponent', () => {
  let component: AddHebergeurComponent;
  let fixture: ComponentFixture<AddHebergeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHebergeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHebergeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
