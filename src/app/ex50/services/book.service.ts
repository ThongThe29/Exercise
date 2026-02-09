import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiUrl = 'http://localhost:3000/books';

    constructor(private http: HttpClient) { }

    // GET all books
    getAllBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.apiUrl);
    }

    // GET single book by id
    getBookById(id: number): Observable<Book> {
        return this.http.get<Book>(`${this.apiUrl}/${id}`);
    }

    // POST create new book
    createBook(book: Book): Observable<Book> {
        return this.http.post<Book>(this.apiUrl, book);
    }

    // PUT update book
    updateBook(id: number, book: Book): Observable<Book> {
        return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
    }

    // DELETE book
    deleteBook(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
