import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { JWTInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { CommonComponentModule } from '../common/common-component.module';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';

@NgModule({
  declarations: [    
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    AppModule,
    CommonModule,
    CommonComponentModule,
    MatSelectModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AuthModule { }
