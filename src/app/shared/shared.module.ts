import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorToastComponent } from './error-toast/error-toast.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorToastComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorToastComponent,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
