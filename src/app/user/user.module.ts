import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './user-routing.module';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations: [
        MyprofileComponent,
        ListUsersComponent,
        ResetPasswordComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ]
})
export class HomeModule { }
