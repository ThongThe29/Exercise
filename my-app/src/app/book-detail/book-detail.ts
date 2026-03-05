import { Component } from '@angular/core';
import { BookAPIService } from '../book-apiservice';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule, HttpClientModule],
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
