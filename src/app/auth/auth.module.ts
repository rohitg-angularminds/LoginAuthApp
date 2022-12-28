import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from "../shared/shared.module";



const google_clientid = "893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com";


@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        VerifyEmailComponent
    ],
    providers: [
        {
            provide: "SocialAuthServiceConfig",
            useValue: {
                authLogin: false,
                providers: [{
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(google_clientid)
                    }]
            } as SocialAuthServiceConfig
        }
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        SocialLoginModule,
        RecaptchaModule,
        SharedModule
    ]
})
export class AuthModule { }
