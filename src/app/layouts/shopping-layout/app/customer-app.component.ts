import { Component, OnInit, Output } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-app',
  templateUrl: './customer-app.component.html',
  styleUrls: ['./customer-app.component.scss']
})
export class CustomerAppComponent implements OnInit {

  constructor(private userService: LocalstorageService) { }
  @Output() custLoggedStatus: any = this.userService.isLoggedin.subscribe( (res) => {
    console.log(res);
    this.custLoggedStatus = res
  }); ;


  ngOnInit(): void {

  }


}
