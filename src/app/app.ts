import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Learnbinding } from './learnbinding/learnbinding';
import { Ptb1 } from './ptb1/ptb1';
import { Learndirective } from './learndirective/learndirective';
import { Listcustomer } from './listcustomer/listcustomer';
import { About } from './about/about';
import { Exercise14 } from './exercise14/exercise14';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Learnbinding, Ptb1, Learndirective, Listcustomer, About, Exercise14],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
