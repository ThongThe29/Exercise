import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
    selector: 'app-book-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
    @Input() book: Book | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() edit = new EventEmitter<Book>();

    getImageUrl(imageName: string): string {
        return `http://localhost:3000/images/books/${imageName}`;
    }

    formatPrice(price: number): string {
        return price.toLocaleString('vi-VN') + ' đ';
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }

    onClose() {
        this.close.emit();
    }

    onEdit() {
        if (this.book) {
            this.edit.emit(this.book);
        }
    }
}
