import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBitcoinPrice } from './interfaces/BitcoinPrice';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  constructor(private http: HttpClient) { }

  getBitcoinData(): Observable<IBitcoinPrice> {
    // Using proxy to alternative.me API to avoid CORS
    return this.http.get<any>('/api/bitcoin').pipe(
      map(response => {
        // Transform alternative.me format to Coindesk format
        // alternative.me returns: [{id: "bitcoin", price_usd: "77625", ...}]
        // We need: {time: {...}, bpi: {USD: {...}, GBP: {...}, EUR: {...}}, ...}

        const bitcoinData = Array.isArray(response) ? response[0] : response;
        const priceUsd = parseFloat(bitcoinData.price_usd);

        // Convert to Coindesk format that the template expects
        const coindeskFormat: IBitcoinPrice = {
          time: {
            updated: new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: 'UTC',
              timeZoneName: 'short'
            }),
            updatedISO: new Date().toISOString(),
            updateduk: new Date().toLocaleString('en-GB')
          },
          disclaimer: 'Data provided by alternative.me API. Exchange rates are approximate.',
          chartName: 'Bitcoin',
          bpi: {
            USD: {
              code: 'USD',
              symbol: '&#36;',
              rate: priceUsd.toLocaleString('en-US', { minimumFractionDigits: 4 }),
              description: 'United States Dollar',
              rate_float: priceUsd
            },
            GBP: {
              code: 'GBP',
              symbol: '&pound;',
              rate: (priceUsd * 0.79).toLocaleString('en-US', { minimumFractionDigits: 4 }),
              description: 'British Pound Sterling',
              rate_float: priceUsd * 0.79
            },
            EUR: {
              code: 'EUR',
              symbol: '&euro;',
              rate: (priceUsd * 0.92).toLocaleString('en-US', { minimumFractionDigits: 4 }),
              description: 'Euro',
              rate_float: priceUsd * 0.92
            }
          }
        };

        return coindeskFormat;
      })
    );
  }
}
