import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book-model';
import { BookService } from '../../_services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book
  constructor(
    private bookService: BookService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getBook();
  }

  private getBook(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }

  public goBack(): void {
    this.location.back();
  }

}
