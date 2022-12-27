import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard, ProfileGuard } from '../guards/profile.guard';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'my-profile',
    component: MyprofileComponent,
    canActivate: [ProfileGuard]
  },
  {
    path:'list-users',
    component: ListUsersComponent,
    canActivate: [ProfileGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
