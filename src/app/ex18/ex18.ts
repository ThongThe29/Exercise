import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ex18',
  imports: [CommonModule],
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 {
  customerGroups: any[] = [
    {
      "CustomerTypeId": 1,
      "CustomterTypeName": "VIP",
      "Customers": [
        {
          "Id": "Cus123",
          "Name": "Obama",
          "Email": "obama@gmail.com",
          "Age": 67,
          "Image": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Official_portrait_of_Barack_Obama.jpg"
        },
        {
          "Id": "Cus456",
          "Name": "Kim jong Un",
          "Email": "unun@gmail.com",
          "Age": 38,
          "Image": "https://p.potaufeu.asahi.com/99bc-p/picture/27589078/01d0e23a891e3e215cb72c6963ac891d.jpg"
        },
        {
          "Id": "Cus789",
          "Name": "Putin",
          "Email": "putin@gmail.com",
          "Age": 77,
          "Image": "https://wallpapers.com/images/hd/vladimir-putin-against-blurry-red-backdrop-3blsf8wubamq414h.jpg"
        }
      ]
    },
    {
      "CustomerTypeId": 2,
      "CustomterTypeName": "Normal",
      "Customers": [
        {
          "Id": "Cus000",
          "Name": "Hồ Cẩm Đào",
          "Email": "hodao@gmail.com",
          "Age": 16,
          "Image": "https://sohanews.sohacdn.com/2013/01012011-nam-moi-1384486779337.jpg"
        },
        {
          "Id": "Cus111",
          "Name": "Tập Cận Bình",
          "Email": "binhbinh@gmail.com",
          "Age": 67,
          "Image": "https://static-images.vnncdn.net/files/publish/2023/3/10/tap-can-binh-575.jpg"
        }
      ]
    }
  ];

  constructor() { }
}
