import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb1',
  imports: [],
  templateUrl: './ptb1.html',
  styleUrl: './ptb1.css',
})
export class Ptb1 {
  get_solution(hsa: HTMLInputElement, hsb: HTMLInputElement, result: HTMLElement) {
    console.log('get_solution called', hsa.value, hsb.value);
    const a = parseFloat(hsa.value);
    const b = parseFloat(hsb.value);
    
    if (isNaN(a) || a === 0) {
      result.textContent = 'Hệ số a phải khác 0';
      return;
    }
    
    const x = -b / a;
    result.textContent = `x = ${x}`;
  }

  clear(hsa: HTMLInputElement, hsb: HTMLInputElement, result: HTMLElement) {
    console.log('clear called');
    hsa.value = '';
    hsb.value = '';
    result.textContent = '';
    hsa.focus();
  }
}
