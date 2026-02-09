import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitcoinService } from '../bitcoin.service';
import { IBitcoinPrice } from '../interfaces/BitcoinPrice';

@Component({
  selector: 'app-ex28',
  imports: [CommonModule],
  templateUrl: './ex28.html',
  styleUrls: ['./ex28.css']
})
export class Ex28 implements OnInit {
  bitcoinData: IBitcoinPrice | null = null;
  errMessage: string = '';

  constructor(private _service: BitcoinService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._service.getBitcoinData().subscribe({
      next: (data) => {
        console.log('✅ Data received:', data);
        this.bitcoinData = data;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.errMessage = err.message;
      }
    });
  }
}
