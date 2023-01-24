import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginGuard } from 'src/app/services/guards/customer.guard';
import { CustLoginComponent } from './cust-login/cust-login.component';
import { CustRegistrationComponent } from './cust-registration/cust-registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:CustLoginComponent
  },
  {
    path:'registration',
    component:CustRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
