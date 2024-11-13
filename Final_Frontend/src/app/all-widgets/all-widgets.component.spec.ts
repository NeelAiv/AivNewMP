import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllWidgetsComponent } from './all-widgets.component';

describe('AllWidgetsComponent', () => {
  let component: AllWidgetsComponent;
  let fixture: ComponentFixture<AllWidgetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
