import { Component } from '@angular/core';
import { BookAPIService } from '../book-apiservice';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail {
  book: any;
  errMessage: string = ''
  constructor(private _service: BookAPIService) {
  }
  searchBook(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => { this.book = data },
      error: (err) => { this.errMessage = err }
    })
  }
}
