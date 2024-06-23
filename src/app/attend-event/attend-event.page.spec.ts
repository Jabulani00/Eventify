import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendEventPage } from './attend-event.page';

describe('AttendEventPage', () => {
  let component: AttendEventPage;
  let fixture: ComponentFixture<AttendEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
