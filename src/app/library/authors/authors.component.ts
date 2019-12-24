import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author-model';
import { Book } from '../../models/book-model';

import { FormControl, Validators } from '@angular/forms';
import { BookService } from '../../_services/book.service';
import { MatSnackBar } from '@angular/material';

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
    private bookService: BookService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  private getAuthors(): void {
    this.bookService.getAuthors().subscribe(authors => {
      this.authors = authors;
      this.authorSearch = this.authors;
      this.getBooksByAuthor(this.authors);
    });
  }

  private getBooksByAuthor(authors: Author[]) {
    for (let author of authors) {
      let authorBooks: Book[] = [];
      this.bookService.getBooksByAuthorId(author.id).subscribe(books => {
        authorBooks = books;
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

  public search(term: string) {
    this.authors = this.authorSearch.filter(option =>
      option[this.searchOption.value].toLowerCase().includes(term.toLowerCase())
    );
  }

}
