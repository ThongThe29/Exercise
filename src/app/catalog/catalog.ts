import { Component } from '@angular/core';
import { CatalogService } from '../catalog.service'; // Assuming correct path based on file list

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  categories: any;
  constructor(private catalogService: CatalogService) {
    this.categories = catalogService.getCategories();
  }
}