import { Component } from '@angular/core';
import { BookAPIService } from '../book-apiservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-book-delete',
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './book-delete.html',
    styleUrl: './book-delete.css'
})
export class BookDelete {
    bookId: string = '';
    books: any;
    errMessage: string = '';

    constructor(private _service: BookAPIService) {
        this.loadBooks();
    }

    loadBooks() {
        this._service.getBooks().subscribe({
            next: (data) => { this.books = data },
            error: (err) => { this.errMessage = err }
        });
    }

    deleteBook() {
        if (!this.bookId) return;
        this._service.deleteBook(+this.bookId).subscribe({
            next: () => {
                this.bookId = '';
                this.loadBooks();
            },
            error: (err) => { this.errMessage = err }
        });
    }
}
