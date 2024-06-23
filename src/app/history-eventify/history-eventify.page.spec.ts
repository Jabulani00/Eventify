import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryEventifyPage } from './history-eventify.page';

describe('HistoryEventifyPage', () => {
  let component: HistoryEventifyPage;
  let fixture: ComponentFixture<HistoryEventifyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryEventifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
