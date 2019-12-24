import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book-model';
import { BookService } from '../_services/book.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  bookSearch: Book[] = [];
  searchOption = new FormControl('name', Validators.required);

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  private getBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.bookSearch = this.books;
    });
  }

  public search(term: string) {
    this.books = this.bookSearch.filter(option =>
      option[this.searchOption.value].toLowerCase().includes(term.toLowerCase())
    );
  }
}
