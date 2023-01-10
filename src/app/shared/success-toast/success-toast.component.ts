import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success-toast',
  templateUrl: './success-toast.component.html',
  styleUrls: ['./success-toast.component.scss']
})
export class SuccessToastComponent implements OnInit {

  constructor() { }

@Input() successMessage :any;

  ngOnInit(): void {
    console.log(this.successMessage)
  }

}
