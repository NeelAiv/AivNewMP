import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewAddedComponent } from './new-added.component';

describe('NewAddedComponent', () => {
  let component: NewAddedComponent;
  let fixture: ComponentFixture<NewAddedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
