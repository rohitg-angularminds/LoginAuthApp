import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard, ProfileGuard } from '../profile.guard';
import { HomeComponent } from './user.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  {
    path:'my-profile',
    component: MyprofileComponent,
    canActivate: [ProfileGuard]
  },
  {
    path:'list-users',
    component: ListUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
