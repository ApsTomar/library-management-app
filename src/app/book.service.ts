import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from './models';
import { catchError, map, tap } from 'rxjs/operators';

// TODO This service can be moved in service folder i think ##vishal

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
    return this.http.get<Book[]>(`${this.baseUrl}/get/books`)
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/get/book-by-id/${id}`)
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }
}
