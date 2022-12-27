import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) {}

  userToken!: string;
  errorMessage!: string;
  verified! : boolean ;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userToken = params['token'];
    });

    this.httpService
      .post('', `/auth/verify-email?token=${this.userToken}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.verified = true;
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message;

        },
      });

  }
}
