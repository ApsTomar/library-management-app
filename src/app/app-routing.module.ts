import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookSearchComponent } from './library/book-search/book-search.component';
import { BooksComponent } from './library/books/books.component';
import { AuthorsComponent } from './library/authors/authors.component';
import { SubjectsComponent } from './library/subjects/subjects.component';
import { BookDetailComponent } from './library/book-detail/book-detail.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule) },
  { path: 'library', loadChildren: () => import('./library/library.module').then(lib => lib.LibraryModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
