import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostAnalyticsPage } from './host-analytics.page';

describe('HostAnalyticsPage', () => {
  let component: HostAnalyticsPage;
  let fixture: ComponentFixture<HostAnalyticsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostAnalyticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
