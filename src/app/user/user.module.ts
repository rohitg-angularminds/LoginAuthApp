import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './user-routing.module';
import { HomeComponent } from './user.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        HomeComponent,
        MyprofileComponent,
        HeaderComponent,
        FooterComponent,
        ListUsersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule,
        ReactiveFormsModule,
    ]
})
export class HomeModule { }
