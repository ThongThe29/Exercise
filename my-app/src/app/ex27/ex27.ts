import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeProductService } from '../myservices/fake-product-service';

@Component({
  selector: 'app-ex27',
  imports: [CommonModule],
  templateUrl: './ex27.html',
  styleUrl: './ex27.css',
})
export class Ex27 {
  data: any;
  errMessage: string = '';

  constructor(private _service: FakeProductService) {
    this._service.getFakeProductData().subscribe({
      next: (data) => { this.data = data },
      error: (err) => { this.errMessage = err }
    });
  }
}
