import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './customer-auth.component.html',
  styleUrls: ['./customer-auth.component.scss']
})
export class CustomerAuthComponent implements OnInit {

  constructor(private userService: LocalstorageService) { }
  custLoggedStatus : any ;

 ngOnInit(): void {
   this.userService.isLoggedin.subscribe( (res) => {
     this.custLoggedStatus = res;
   }); ;
 }
}
