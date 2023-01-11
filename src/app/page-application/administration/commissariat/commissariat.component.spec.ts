import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissariatComponent } from './commissariat.component';

describe('CommissariatComponent', () => {
  let component: CommissariatComponent;
  let fixture: ComponentFixture<CommissariatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissariatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
