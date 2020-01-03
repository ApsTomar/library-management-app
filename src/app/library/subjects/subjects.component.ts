import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book-model';
import { Subject } from '../../models/subject-model';

import { FormControl, Validators } from '@angular/forms';
import { BookService } from '../../_services/book.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  subjectSearch: Subject[] = [];
  newSubject: Subject = {
    id: 0,
    name: '',
  };
  subjectBooksLoad: boolean = false;
  bookMap: {
    [subject: string]: Book[];
  };
  searchOption = new FormControl('name', Validators.required);

  constructor(
    private bookService: BookService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SubjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.newSubject.name = data.name;
      this.bookService.addSubject(this.newSubject).subscribe(data => {
        this.snackBar.open('subject added successfully', 'dismiss', {
          duration: 2000,
          panelClass: 'success'
        })
        this.getSubjects();
      });
    });
  }

  ngOnInit() {
    this.getSubjects();
  }

  private getSubjects(): void {
    this.bookService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
      this.subjectSearch = this.subjects;
      this.getBooksBySubject(this.subjects);
    });
  }

  private getBooksBySubject(subjects: Subject[]) {
    for (let subject of subjects) {
      let subjectBooks: Book[] = [];
      this.bookService.getBooksBySubjectId(subject.id).subscribe(books => {
        subjectBooks = books;
        if (books) {
          if (subjectBooks.length <= 3) {
            this.bookMap = {
              ...this.bookMap,
              [subject.name]: [...subjectBooks]
            }
          } else {
            this.bookMap = {
              ...this.bookMap,
              [subject.name]: [...subjectBooks.slice(0, 3)]
            }
          }
        }
        this.subjectBooksLoad = true;
      });
    }
  }
  public search(term: string) {
    this.subjects = this.subjectSearch.filter(option =>
      option[this.searchOption.value].toLowerCase().includes(term.toLowerCase())
    );
  }


}
