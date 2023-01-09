import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustLoginComponent } from './cust-login/cust-login.component';
import { CustRegistrationComponent } from './cust-registration/cust-registration.component';
import { CustProfileComponent } from './cust-profile/cust-profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'login',
    component:CustLoginComponent
  },
  {
    path:'registration',
    component:CustRegistrationComponent
  },
  {
    path:'profile',
    component: CustProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
