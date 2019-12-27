import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Book } from '../../models/book-model';
import { BookService } from '../../_services/book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books:Book[];
  private searchTerm:BehaviorSubject<string> = new BehaviorSubject('');
  private subscriptions: Subscription[] = [];
  constructor(private bookService: BookService) { }

  public search(term: string): void {
    this.searchTerm.next(term);
  }

  ngOnInit(): void {
    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length > 0)
    ).subscribe(term => {
      this.bookService.getBooksByName(term);
    });
    this.subscriptions.push(this.bookService.booksList$.subscribe(books => {
      console.log(books);
      this.books = books;
    }))
    
  }
  ngOnDestroy(){
    this.subscriptions.forEach(subs => subs.unsubscribe());
    this.bookService.reset();
  }
}
