import { Component, OnInit } from '@angular/core';
import { Subject, Book } from '../models';
import { FormControl, Validators } from '@angular/forms';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  subjectSearch: Subject[] = [];
  subjectBooksLoad: boolean = false;
  bookMap: {
    [subject: string]: Book[];
  };
  searchOption = new FormControl('name', Validators.required);

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects(): void {
    this.bookService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
      this.subjectSearch = this.subjects;
      this.getBooksBySubject(this.subjects);
    });
  }

  getBooksBySubject(subjects: Subject[]) {
    for (let subject of subjects) {
      let subjectBooks: Book[] = [];
      this.bookService.getBooksBySubjectId(subject.id).subscribe(books => {
        subjectBooks = books;
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
        this.subjectBooksLoad = true;
      });

    }

  }
  search(term: string) {
    this.subjects = this.subjectSearch.filter(option =>
      option[this.searchOption.value].toLowerCase().includes(term.toLowerCase())
    );
  }

}
