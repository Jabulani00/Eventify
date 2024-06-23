import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleManagerPage } from './role-manager.page';

describe('RoleManagerPage', () => {
  let component: RoleManagerPage;
  let fixture: ComponentFixture<RoleManagerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
