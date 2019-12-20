import { Component, OnInit } from '@angular/core';
import { Author, Book } from '../models';
import { FormControl, Validators } from '@angular/forms';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  authorSearch: Author[] = [];
  authorBooksLoad: boolean = false;
  bookMap: {
    [author: string]: Book[];
  };
  searchOption = new FormControl('name', Validators.required);

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.bookService.getAuthors().subscribe(authors => {
      this.authors = authors;
      this.authorSearch = this.authors;
      this.getBooksByAuthor(this.authors);
    });
  }

  getBooksByAuthor(authors: Author[]) {
    for (let author of authors) {
      let authorBooks: Book[] = [];
      this.bookService.getBooksByAuthorId(author.id).subscribe(books => {
        authorBooks = books;
        console.log(authorBooks)
        if (authorBooks.length <= 3) {
          this.bookMap = {
            ...this.bookMap,
            [author.name]: [...authorBooks]
          }
        } else {
          this.bookMap = {
            ...this.bookMap,
            [author.name]: [...authorBooks.slice(0, 3)]
          }
        }
        this.authorBooksLoad = true;
      });

    }

  }
  search(term: string) {
    this.authors = this.authorSearch.filter(option =>
      option[this.searchOption.value].toLowerCase().includes(term.toLowerCase())
    );
  }

}
