import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrendingProductsComponent } from './trending-produts.component';

describe('TrendingProductsComponent', () => {
  let component: TrendingProductsComponent;
  let fixture: ComponentFixture<TrendingProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
