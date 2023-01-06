import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';

@NgModule({
  declarations: [
    SignupPageComponent,
    SigninPageComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
