import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
    selector: 'app-book-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
    @Input() books: Book[] = [];
    @Input() loading: boolean = false;
    @Output() createNew = new EventEmitter<void>();
    @Output() edit = new EventEmitter<Book>();
    @Output() viewDetails = new EventEmitter<Book>();
    @Output() delete = new EventEmitter<Book>();

    getImageUrl(imageName: string): string {
        return `http://localhost:3000/images/books/${imageName}`;
    }

    formatPrice(price: number): string {
        if (!price && price !== 0) return '0 đ';
        return price.toLocaleString('vi-VN') + ' đ';
    }

    formatDate(dateString: string): string {
        if (!dateString) return '';
        // Date is already in format: DD/MM/YYYY HH:MM SA
        return dateString;
    }

    onCreateNew() {
        this.createNew.emit();
    }

    onEdit(book: Book) {
        this.edit.emit(book);
    }

    onViewDetails(book: Book) {
        this.viewDetails.emit(book);
    }

    onDelete(book: Book) {
        this.delete.emit(book);
    }
}
