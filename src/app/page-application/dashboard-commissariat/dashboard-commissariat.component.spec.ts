import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCommissariatComponent } from './dashboard-commissariat.component';

describe('DashboardCommissariatComponent', () => {
  let component: DashboardCommissariatComponent;
  let fixture: ComponentFixture<DashboardCommissariatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCommissariatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCommissariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
