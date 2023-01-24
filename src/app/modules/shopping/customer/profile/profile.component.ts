import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private http : HttpService) { }

  customerDetails! : any ;

  ngOnInit(): void {
    this.getCustomerProfile()

  }

// function for customer profile

  getCustomerProfile(){
    this.http.get('/shop/auth/self').subscribe({
        next: (data) => { this.customerDetails = data}
    })
  }

}
