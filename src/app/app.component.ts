import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'loginAuthApp';

constructor(private httpService : HttpService){}

  loggedInStatus! : boolean ;
  ngOnInit(): void {

    this.loggedInStatus = localStorage.getItem('userVerified') ? true : false
  }

}
