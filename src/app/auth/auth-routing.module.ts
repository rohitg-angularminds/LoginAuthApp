import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginGuard } from '../guards/profile.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { BrowserModule } from '@angular/platform-browser';

const routes : Routes    = [

    {
      path:'login',
      component: LoginComponent,
      canActivate: [LoginGuard]
    },
    {
      path:'register',
      component: RegistrationComponent,
      canActivate: [LoginGuard]
    },
    {
      path:'reset-password',
      component: ResetPasswordComponent,
      canActivate: [LoginGuard]
    },
    {
      path:'verify-email',
      component: VerifyEmailComponent
    }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
