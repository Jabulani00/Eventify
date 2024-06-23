import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostTabsPage } from './host-tabs.page';

describe('HostTabsPage', () => {
  let component: HostTabsPage;
  let fixture: ComponentFixture<HostTabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
