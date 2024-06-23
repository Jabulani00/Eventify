import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventifyPage } from './eventify.page';

describe('EventifyPage', () => {
  let component: EventifyPage;
  let fixture: ComponentFixture<EventifyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
