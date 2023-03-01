import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-app',
  templateUrl: './customer-app.component.html',
  styleUrls: ['./customer-app.component.scss']
})
export class CustomerAppComponent implements OnInit {

  constructor(private userService: LocalstorageService) { }
   custLoggedStatus : any ;

  ngOnInit(): void {
    this.userService.isLoggedin.subscribe( (res) => {
      this.custLoggedStatus = res;
    }); ;
  }


}
