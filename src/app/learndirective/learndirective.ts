import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-learndirective',
  imports: [NgIf],
  templateUrl: './learndirective.html',
  styleUrl: './learndirective.css',
})
export class Learndirective {
  flag_value:number=1
  changeView()
  {
    if(this.flag_value==1)
      this.flag_value=2;
    else
      this.flag_value=1;
  }
}
