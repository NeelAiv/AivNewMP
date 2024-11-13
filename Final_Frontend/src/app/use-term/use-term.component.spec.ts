import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UseTermComponent } from './use-term.component';

describe('UseTermComponent', () => {
  let component: UseTermComponent;
  let fixture: ComponentFixture<UseTermComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UseTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
