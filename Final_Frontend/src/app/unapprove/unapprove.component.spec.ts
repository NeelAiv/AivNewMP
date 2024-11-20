import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapproveComponent } from './unapprove.component';

describe('UnapproveComponent', () => {
  let component: UnapproveComponent;
  let fixture: ComponentFixture<UnapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
