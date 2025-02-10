import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WordleService } from '../../services/wordle.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-word-suggestions',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './word-suggestions.component.html',
  styleUrls: ['./word-suggestions.component.sass']
})
export class WordSuggestionsComponent {
  suggestions$: Observable<string[]>;

  constructor(private wordleService: WordleService) {
    this.suggestions$ = this.wordleService.suggestions$;
  }
}
