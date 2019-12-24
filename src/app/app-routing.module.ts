import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: BookSearchComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },
  { path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard] },
  { path: 'books/book-detail/:id', component: BookDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
