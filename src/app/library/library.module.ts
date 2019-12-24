import { NgModule } from '@angular/core';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { AuthorsComponent } from './authors/authors.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { MatSelectModule, MatSnackBarModule, MatCardModule } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JWTInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { CommonComponentModule } from '../common/common-component.module';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  declarations: [
    BooksComponent,
    BookDetailComponent,
    AlertsComponent,
    BookSearchComponent,
    AuthorsComponent,
    SubjectsComponent,
  ],
  imports: [
    CommonComponentModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    LibraryRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class LibraryModule { }
