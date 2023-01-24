import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAppComponent } from './seller-app.component';

describe('SellerAppComponent', () => {
  let component: SellerAppComponent;
  let fixture: ComponentFixture<SellerAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
