import { Component } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { BookAPIService } from '../book-apiservice';
import { Book } from '../myclasses/iBook';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-new',
  imports: [FormsModule, CommonModule],
  templateUrl: './book-new.html',
  styleUrls: ['./book-new.css']
})
export class BookNewComponent {
  book = new Book();
  books: any;
  errMessage: string = '';

  constructor(private _service: BookAPIService) {
    // Load all books on component initialization
    this._service.getBooks().subscribe({
      next: (data) => { this.books = data },
      error: (err) => { this.errMessage = err }
    })
  }

  postBook() {
    this._service.postBook(this.book).subscribe({
      next: (data) => {
        // Update books list with latest data from server
        this.books = data;
        // Show success message
        this.errMessage = 'book-new works!';
        // Reset form
        this.book = new Book();
      },
      error: (err) => { this.errMessage = err }
    })
  }
}
