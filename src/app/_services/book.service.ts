import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Subject } from '../models/subject-model';
import { Book } from '../models/book-model';

import { Author } from '../models/author-model';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8001';
  private bookList$$: BehaviorSubject<Book[]> = new BehaviorSubject(null);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { 
  }
  public get booksList$(): Observable<Book[]>{
    return this.bookList$$.asObservable();
  }
  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get/books`);
  }

  public getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/get/book-by-id/${id}`);
  }

  public getBooksByName(name: string) {
    this.http.get<Book[]>(`${this.baseUrl}/get/books-by-name/${name}`).subscribe(books => {
      if(books){
          this.bookList$$.next(books);
      }
    });
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
  public reset(){
    this.bookList$$.next(null);
  }
}
