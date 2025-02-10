// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AttemptInputComponent } from './components/attempt-input/attempt-input.component';
import { AttemptsDisplayComponent } from './components/attempts-display/attempts-display.component';
import { WordSuggestionsComponent } from './components/word-suggestions/word-suggestions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    AttemptInputComponent,
    AttemptsDisplayComponent,
    WordSuggestionsComponent
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Wordle Generator</span>
    </mat-toolbar>

    <div class="main-container">
      <div class="board-container">
        <app-attempt-input></app-attempt-input>
        <app-attempts-display></app-attempts-display>
      </div>
      <div class="suggestions-container">
        <app-word-suggestions></app-word-suggestions>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.sass']
})
export class AppComponent { }
