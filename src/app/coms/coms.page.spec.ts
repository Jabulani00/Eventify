import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComsPage } from './coms.page';

describe('ComsPage', () => {
  let component: ComsPage;
  let fixture: ComponentFixture<ComsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
