import { Component, OnInit } from '@angular/core';
import { Book, Author } from '../models';
import { BookService } from '../_services/book.service';
import 'lodash';
declare var _: any;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  bookSearch: Book[] = [];
  searchOptipns: {
    name: string,
    author: string,
    subject: string
  } = {
     name : '',
     author: '',
     subject: ''
  }
  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.bookSearch = this.books;
    });
    this.search('',);
  }

  // onKey(value) {
  //   this.bookNames = this.search(value);
  // }

  search(name?: string,author?: string, subject?: string) {
  console.log(name)
    this.books =  this.bookSearch.filter(option =>
     (name && (option.name.toLowerCase().includes(name.toLowerCase()) || name == '') ) && 
      (author && (option.authorName.toLowerCase().includes(author.toLowerCase()) || author == '')) &&
     (subject && (option.subject.toLowerCase().includes(subject.toLowerCase()) || subject == ''))
    );
    console.log(this.books)
  }
}
