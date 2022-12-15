import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { LocalstorageService } from 'src/app/localstorage.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export class MyprofileComponent implements OnInit {
  constructor(public service: LocalstorageService, public httpService: HttpService, ) {
    this.httpService.getProfileData();

    this.httpService.profile.subscribe(data => {
          this.username = data.name;
          this.useremail = data.email
          this.company = data._org.name
    })
  }

  username!: any;
  useremail!: any;
  company!: any;


  ngOnInit(): void {

  }




}
