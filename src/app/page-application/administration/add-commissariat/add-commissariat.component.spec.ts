import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommissariatComponent } from './add-commissariat.component';

describe('AddCommissariatComponent', () => {
  let component: AddCommissariatComponent;
  let fixture: ComponentFixture<AddCommissariatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommissariatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommissariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
