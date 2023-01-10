import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustHeaderComponent } from './cust-header.component';

describe('CustHeaderComponent', () => {
  let component: CustHeaderComponent;
  let fixture: ComponentFixture<CustHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
