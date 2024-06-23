import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendeeTabsPage } from './attendee-tabs.page';

describe('AttendeeTabsPage', () => {
  let component: AttendeeTabsPage;
  let fixture: ComponentFixture<AttendeeTabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
