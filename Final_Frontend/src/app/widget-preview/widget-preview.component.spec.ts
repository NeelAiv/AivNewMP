import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WidgetPreviewComponent } from './widget-preview.component';

describe('WidgetPreviewComponent', () => {
  let component: WidgetPreviewComponent;
  let fixture: ComponentFixture<WidgetPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
