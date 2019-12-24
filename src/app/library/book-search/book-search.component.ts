import { Component, OnInit } from '@angular/core';
import { Observable, Subject, pipe } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, map, filter
} from 'rxjs/operators';
import { Book } from '../../models/book-model';
import { BookService } from '../../_services/book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  books$: Observable<Book[]>;
  private searchTerm = new Subject<string>();

  constructor(private bookService: BookService) { }

  public search(term: string): void {
    this.searchTerm.next(term);
  }

  ngOnInit(): void {
    this.books$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length > 0),
      switchMap((term: string) =>this.bookService.getBooksByName(term)),
    );
  }
}
