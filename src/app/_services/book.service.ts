import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book, Author, Subject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8001';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/get/book-by-id/${id}`);
  }

  getBooksByName(name: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get/books-by-name/${name}`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.baseUrl}/get/authors`);
  }

  getBooksByAuthorId(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get/books-by-author/${authorId}`);
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/get/subjects`);
  }

  getBooksBySubjectId(subjectId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get/books-by-subject/${subjectId}`);
  }
}
