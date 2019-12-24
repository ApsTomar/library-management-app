import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Subject } from '../models/subject-model';
import { Book } from '../models/book-model';

import { Author } from '../models/author-model';


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

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get/books`);
  }

  public getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/get/book-by-id/${id}`);
  }

  public getBooksByName(name: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get/books-by-name/${name}`);
  }

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.baseUrl}/get/authors`);
  }

  public getBooksByAuthorId(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get/books-by-author/${authorId}`);
  }

  public getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/get/subjects`);
  }

  public getBooksBySubjectId(subjectId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get/books-by-subject/${subjectId}`);
  }
}
