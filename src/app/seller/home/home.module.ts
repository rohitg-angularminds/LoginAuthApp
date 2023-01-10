import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { SharedModule } from "../../shared/shared.module";
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
    declarations: [
        MyprofileComponent,
        UsersComponent,
        ResetPasswordComponent,
        ProductsComponent,
        ProductDetailsComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ]
})
export class HomeModule { }
