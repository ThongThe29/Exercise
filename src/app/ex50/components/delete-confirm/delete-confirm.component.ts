import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
    selector: 'app-delete-confirm',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './delete-confirm.component.html',
    styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {
    @Input() book: Book | null = null;
    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    onConfirm() {
        this.confirm.emit();
    }

    onCancel() {
        this.cancel.emit();
    }
}
