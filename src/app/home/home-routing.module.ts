import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard, ProfileGuard } from '../profile.guard';
import { MyprofileComponent } from './myprofile/myprofile.component';

const routes: Routes = [
  {
    path:'my-profile',
    component: MyprofileComponent,
    canActivate: [ProfileGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
