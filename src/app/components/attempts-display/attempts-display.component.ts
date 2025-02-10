import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WordleService, WordAttempt } from '../../services/wordle.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attempts-display',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './attempts-display.component.html',
  styleUrls: ['./attempts-display.component.scss']
})
export class AttemptsDisplayComponent {
  attempts$: Observable<WordAttempt[]>;

  constructor(private wordleService: WordleService) {
    this.attempts$ = this.wordleService.attempts$;
  }
}
