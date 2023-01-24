import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustRegistrationComponent } from './cust-registration.component';

describe('CustRegistrationComponent', () => {
  let component: CustRegistrationComponent;
  let fixture: ComponentFixture<CustRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
