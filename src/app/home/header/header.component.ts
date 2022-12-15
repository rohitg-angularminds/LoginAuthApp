import { Component, Input, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: LocalstorageService) { }




  ngOnInit(): void {

  }

  userLogout(){
    this.userService.deleteUserToken()
}



}
