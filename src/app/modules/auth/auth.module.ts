import { NgModule } from '@angular/core';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    SignupPageComponent,
    SigninPageComponent,
  ],
  imports: [
    // SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
