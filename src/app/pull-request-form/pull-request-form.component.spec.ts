import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullRequestFormComponent } from './pull-request-form.component';

describe('PullRequestFormComponent', () => {
  let component: PullRequestFormComponent;
  let fixture: ComponentFixture<PullRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PullRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
