import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cust-header',
  templateUrl: './cust-header.component.html',
  styleUrls: ['./cust-header.component.scss']
})
export class CustHeaderComponent implements OnInit {

  constructor() { }

@Input() custLoggedStatus : any;

  ngOnInit(): void {
  }

  
}
