import { NgModule } from '@angular/core';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgClass } from '@angular/common';

@NgModule({
  declarations: [
    SignupPageComponent,
    SigninPageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    NgbModalModule,
    CommonModule,
  ],
})
export class AuthModule { }
