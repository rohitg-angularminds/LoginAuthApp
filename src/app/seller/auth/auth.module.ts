import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from "../../shared/shared.module";





@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        VerifyEmailComponent
    ],
    providers: [

    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        RecaptchaModule,
        SharedModule
    ]
})
export class AuthModule { }
