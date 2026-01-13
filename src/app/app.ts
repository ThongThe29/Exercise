import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Learnbinding } from './learnbinding/learnbinding';
import { Ptb1 } from './ptb1/ptb1';
import { Learndirective } from './learndirective/learndirective';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Learnbinding, Ptb1, Learndirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
