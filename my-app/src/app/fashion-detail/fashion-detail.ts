import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FashionAPIService } from '../myservices/fashion-apiservice';

@Component({
    selector: 'app-fashion-detail',
    imports: [CommonModule, HttpClientModule],
    templateUrl: './fashion-detail.html',
    styleUrl: './fashion-detail.css',
})
export class FashionDetail {
    fashion: any;
    errMessage: string = '';

    constructor(private _service: FashionAPIService) { }

    searchFashion(id: string) {
        this._service.getFashion(id).subscribe({
            next: (data) => { this.fashion = data },
            error: (err) => { this.errMessage = err }
        });
    }
}
