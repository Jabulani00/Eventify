import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostConfPage } from './post-conf.page';

describe('PostConfPage', () => {
  let component: PostConfPage;
  let fixture: ComponentFixture<PostConfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostConfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
