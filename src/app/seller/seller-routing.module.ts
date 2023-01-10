import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { ProfileGuard } from "../guards/seller.guard";


const routes : Routes = [

  {
        path:'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule ),
      },
      {
        path:'',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [ProfileGuard]
      },
]

@NgModule({

    imports: [RouterModule.forChild(routes),
    AuthModule,
],
    exports: [RouterModule],
  })
  export class SellerRoutingModule {}
