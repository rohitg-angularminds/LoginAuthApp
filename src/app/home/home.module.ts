import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        HomeComponent,
        MyprofileComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
