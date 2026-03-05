import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FashionAPIService } from '../myservices/fashion-apiservice';

@Component({
  selector: 'app-fashion-component',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './fashion.component.html',
  styleUrl: './fashion.component.css',
})
export class FashionComponent {
  fashions: any;
  errMessage: string = '';

  constructor(public _service: FashionAPIService) {
    this._service.getFashions().subscribe({
      next: (data) => { this.fashions = data },
      error: (err) => { this.errMessage = err }
    });
  }
}
