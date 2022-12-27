import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { MyprofileComponent } from './user/myprofile/myprofile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginGuard, ProfileGuard } from './guards/profile.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule ),
  },
  {
    path:'user',
    loadChildren: () => import('./user/user.module').then((m) => m.HomeModule),
  },
  {
    path:'**',
    component: PageNotFoundComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
