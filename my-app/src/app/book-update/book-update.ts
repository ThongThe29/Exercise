import { Component } from '@angular/core';
import { BookAPIService } from '../book-apiservice';
import { Book } from '../myclasses/iBook';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-book-update',
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './book-update.html',
    styleUrl: './book-update.css'
})
export class BookUpdate {
    book = new Book();
    books: any;
    errMessage: string = '';

    constructor(private _service: BookAPIService) {
        this._service.getBooks().subscribe({
            next: (data) => { this.books = data },
            error: (err) => { this.errMessage = err }
        });
    }

    putBook() {
        this._service.putBook(this.book).subscribe({
            next: (data) => { this.books = data },
            error: (err) => { this.errMessage = err }
        });
    }
}
