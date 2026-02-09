import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
    selector: 'app-book-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
    @Input() book: Book | null = null;
    @Input() mode: 'create' | 'edit' = 'create';
    @Output() submit = new EventEmitter<Book>();
    @Output() cancel = new EventEmitter<void>();

    bookForm!: FormGroup;
    imagePreview: string = '';

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.initForm();

        if (this.book) {
            // Edit mode - use existing book data
            this.bookForm.patchValue(this.book);
            this.imagePreview = this.getImageUrl(this.book.anhBia);
        } else {
            // Create mode - set current date
            const today = new Date();
            const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()} ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')} ${today.getHours() < 12 ? 'SA' : 'CH'}`;
            this.bookForm.patchValue({ ngayCapNhat: formattedDate });
        }
    }

    initForm() {
        this.bookForm = this.fb.group({
            id: [null],  // Add ID field to preserve book ID when editing
            tenSach: ['', [Validators.required, Validators.minLength(3)]],
            giaBan: [0, [Validators.required, Validators.min(0)]],
            moTa: ['', Validators.required],
            anhBia: ['', Validators.required],
            ngayCapNhat: ['', Validators.required],
            soLuongTon: [0, [Validators.required, Validators.min(0)]],
            maCD: [0, [Validators.required, Validators.min(1)]],
            maNXB: [0, [Validators.required, Validators.min(1)]]
        });
    }

    getImageUrl(imageName: string): string {
        return `http://localhost:3000/images/books/${imageName}`;
    }

    onImageChange(event: any) {
        const fileName = event.target.value.split('\\').pop();
        if (fileName) {
            this.bookForm.patchValue({ anhBia: fileName });
            this.imagePreview = this.getImageUrl(fileName);
        }
    }

    onSubmit() {
        if (this.bookForm.valid) {
            this.submit.emit(this.bookForm.value);
        } else {
            Object.keys(this.bookForm.controls).forEach(key => {
                this.bookForm.get(key)?.markAsTouched();
            });
        }
    }

    onCancel() {
        this.cancel.emit();
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.bookForm.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }

    getErrorMessage(fieldName: string): string {
        const field = this.bookForm.get(fieldName);
        if (field?.hasError('required')) {
            return 'Trường này là bắt buộc';
        }
        if (field?.hasError('minlength')) {
            return `Tối thiểu ${field.errors?.['minlength'].requiredLength} ký tự`;
        }
        if (field?.hasError('min')) {
            return `Giá trị tối thiểu là ${field.errors?.['min'].min}`;
        }
        return '';
    }
}
