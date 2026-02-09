import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './services/book.service';
import { Book } from './models/book.model';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';

@Component({
    selector: 'app-ex50',
    standalone: true,
    imports: [
        CommonModule,
        BookListComponent,
        BookFormComponent,
        BookDetailsComponent,
        DeleteConfirmComponent
    ],
    templateUrl: './ex50.component.html',
    styleUrls: ['./ex50.component.css']
})
export class Ex50Component implements OnInit {
    books = signal<Book[]>([]);
    loading = signal<boolean>(false);
    currentView = signal<'list' | 'form' | 'details'>('list');
    selectedBook = signal<Book | null>(null);
    formMode = signal<'create' | 'edit'>('create');
    showDeleteConfirm = signal<boolean>(false);
    bookToDelete = signal<Book | null>(null);
    toastMessage = signal<string>('');
    showToast = signal<boolean>(false);

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.loadBooks();
    }

    loadBooks() {
        this.loading.set(true);
        this.bookService.getAllBooks().subscribe({
            next: (data) => {
                this.books.set(data);
                this.loading.set(false);
            },
            error: (error) => {
                console.error('Error loading books:', error);
                this.loading.set(false);
                this.displayToast('❌ Lỗi khi tải danh sách sách');
            }
        });
    }

    onCreateNew() {
        this.formMode.set('create');
        this.selectedBook.set(null);
        this.currentView.set('form');
    }

    onEdit(book: Book) {
        this.formMode.set('edit');
        this.selectedBook.set(book);
        this.currentView.set('form');
    }

    onViewDetails(book: Book) {
        this.selectedBook.set(book);
        this.currentView.set('details');
    }

    onDeleteRequest(book: Book) {
        this.bookToDelete.set(book);
        this.showDeleteConfirm.set(true);
    }

    onDeleteConfirm() {
        const book = this.bookToDelete();
        if (book && book.id) {
            this.bookService.deleteBook(book.id).subscribe({
                next: () => {
                    this.displayToast(`✅ Đã xóa "${book.tenSach}" thành công`);
                    this.loadBooks();
                    this.showDeleteConfirm.set(false);
                    this.bookToDelete.set(null);
                },
                error: (error) => {
                    console.error('Error deleting book:', error);
                    this.displayToast('❌ Lỗi khi xóa sách');
                }
            });
        }
    }

    onDeleteCancel() {
        this.showDeleteConfirm.set(false);
        this.bookToDelete.set(null);
    }

    onFormSubmit(book: Book) {
        if (this.formMode() === 'create') {
            this.bookService.createBook(book).subscribe({
                next: () => {
                    this.displayToast('✅ Tạo mới sách thành công');
                    this.loadBooks();
                    this.currentView.set('list');
                },
                error: (error) => {
                    console.error('Error creating book:', error);
                    this.displayToast('❌ Lỗi khi tạo sách');
                }
            });
        } else {
            const bookId = this.selectedBook()?.id;
            if (bookId) {
                this.bookService.updateBook(bookId, book).subscribe({
                    next: () => {
                        this.displayToast('✅ Cập nhật sách thành công');
                        this.loadBooks();
                        this.currentView.set('list');
                    },
                    error: (error) => {
                        console.error('Error updating book:', error);
                        this.displayToast('❌ Lỗi khi cập nhật sách');
                    }
                });
            }
        }
    }

    onFormCancel() {
        this.currentView.set('list');
        this.selectedBook.set(null);
    }

    onDetailsClose() {
        this.currentView.set('list');
        this.selectedBook.set(null);
    }

    displayToast(message: string) {
        this.toastMessage.set(message);
        this.showToast.set(true);
        setTimeout(() => {
            this.showToast.set(false);
        }, 3000);
    }
}
