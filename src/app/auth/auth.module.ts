import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

const google_clientid = "893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com";


@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        VerifyEmailComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        RecaptchaModule,
        RouterModule,
        FormsModule,
        SocialLoginModule,
    ],
    providers: [
      {
        provide: "SocialAuthServiceConfig",
        useValue: {
           authLogin: false,
           providers: [{
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              google_clientid
            )
           }]
        }as SocialAuthServiceConfig
      }
    ]
})
export class AuthModule { }
