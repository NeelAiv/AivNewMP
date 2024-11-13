import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadWidgetComponent } from './upload-widget.component';

describe('UploadWidgetComponent', () => {
  let component: UploadWidgetComponent;
  let fixture: ComponentFixture<UploadWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
