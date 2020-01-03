import { NgModule } from '@angular/core';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { AuthorsComponent } from './authors/authors.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { MatSelectModule, MatSnackBarModule, MatCardModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JWTInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { CommonComponentModule } from '../common/common-component.module';
import { LibraryRoutingModule } from './library-routing.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthorDialogComponent } from './author-dialog/author-dialog.component';
import { SubjectDialogComponent } from './subject-dialog/subject-dialog.component';
import { BookDialogComponent } from './book-dialog/book-dialog.component';


@NgModule({
  declarations: [
    BooksComponent,
    BookDetailComponent,
    AlertsComponent,
    BookSearchComponent,
    AuthorsComponent,
    SubjectsComponent,
    AuthorDialogComponent,
    SubjectDialogComponent,
    BookDialogComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    LibraryRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents: [
    AuthorDialogComponent,
    SubjectDialogComponent,
    BookDialogComponent,
  ],
})
export class LibraryModule { }
