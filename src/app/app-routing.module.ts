import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { MyprofileComponent } from './home/myprofile/myprofile.component';
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
    path:'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [ProfileGuard]
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
