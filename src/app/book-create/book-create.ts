import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookAPIService } from '../book-apiservice';
import { IBook } from '../myclasses/iBook';

@Component({
  selector: 'app-book-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-create.html',
  styleUrl: './book-create.css',
})
export class BookCreate {
  book: IBook = { BookId: '', BookName: '', Price: 0, Image: '' };
  message: string = '';
  allBooks: any[] = [];

  constructor(private _service: BookAPIService) { }

  createBook() {
    this._service.createBook(this.book).subscribe({
      next: (data) => {
        this.allBooks = data;
        this.message = 'Book created successfully! Total books: ' + data.length;
        // Reset form
        this.book = { BookId: '', BookName: '', Price: 0, Image: '' };
      },
      error: (err) => {
        this.message = 'Error: ' + err.message;
      }
    });
  }
}
