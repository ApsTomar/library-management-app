import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book-model';
import { BookService } from '../../_services/book.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  bookSearch: Book[] = [];
  searchOption = new FormControl('name', Validators.required);
  newBook: Book = {
    id: 0,
    name: '',
    subject: '',
    authorId: '',
    authorName: '',
    available: true,
    availableDate: new Date(),
  }

  constructor(
    private bookService: BookService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(BookDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.newBook.name = data.name;
      this.newBook.subject = data.subject;
      this.newBook.authorId = data.authorId;
      this.newBook.authorName = data.authorName;
    
      this.bookService.addBook(this.newBook).subscribe(data => {
        this.snackBar.open('book added successfully', 'dismiss', {
          duration: 2000,
          panelClass: 'success'
        })
        this.getBooks();
      });
    });
  }
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
