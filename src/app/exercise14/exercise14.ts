import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-exercise14',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise14.html',
  styleUrl: './exercise14.css',
})
export class Exercise14 {
  categories: any[] = [];

  constructor(private catalogService: CatalogService) {
    this.categories = this.catalogService.getCategories();
  }
}
