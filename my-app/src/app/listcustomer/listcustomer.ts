import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listcustomer',
  imports: [CommonModule],
  templateUrl: './listcustomer.html',
  styleUrl: './listcustomer.css',
})
export class Listcustomer {
  customers = [
    { "id": "c1", "name": "Putin", "age": "72", "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSztcXxnCD-2i4sbBTMX-s5KsmGdgcap3EUBA&s" },
    { "id": "c2", "name": "Trump", "age": "78", "picture": "https://cdn.britannica.com/21/197021-050-D0AC3E38/portrait-Donald-Trump.jpg" },
    { "id": "c3", "name": "Kim", "age": "40", "picture": "https://p.potaufeu.asahi.com/99bc-p/picture/27589078/01d0e23a891e3e215cb72c6963ac891d.jpg" },
    { "id": "c4", "name": "Tap", "age": "82", "picture": "https://static-images.vnncdn.net/files/publish/2023/3/10/tap-can-binh-575.jpg" },
  ]
}