import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { JWTInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material';
import { BookSearchComponent } from './book-search/book-search.component';
import { AuthorsComponent } from './authors/authors.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TopnavComponent } from './topnav/topnav.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    LoginComponent,
    AlertsComponent,
    SignupComponent,
    BookSearchComponent,
    AuthorsComponent,
    SubjectsComponent,
    TopnavComponent
  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
