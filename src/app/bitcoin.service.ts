import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBitcoinPrice } from './interfaces/BitcoinPrice';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  constructor(private http: HttpClient) { }

  getBitcoinData(): Observable<IBitcoinPrice> {
    return this.http.get<IBitcoinPrice>('/v1/bpi/currentprice.json');
  }
}
