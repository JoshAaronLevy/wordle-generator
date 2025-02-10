import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import words from 'an-array-of-english-words';

export interface LetterState {
  letter: string;
  state: 'correct' | 'present' | 'absent';
}

export interface WordAttempt {
  letters: LetterState[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule
  ]
})
export class AppComponent {
  wordForm: FormGroup;
  attempts: WordAttempt[] = [];
  suggestions: string[] = [];
  private wordList: string[] = words.filter(word => word.length === 5);

  constructor(private fb: FormBuilder) {
    this.wordForm = this.fb.group({
      letter0: ['', [Validators.required, Validators.pattern('[A-Za-z]')]],
      letter1: ['', [Validators.required, Validators.pattern('[A-Za-z]')]],
      letter2: ['', [Validators.required, Validators.pattern('[A-Za-z]')]],
      letter3: ['', [Validators.required, Validators.pattern('[A-Za-z]')]],
      letter4: ['', [Validators.required, Validators.pattern('[A-Za-z]')]],
      state0: ['absent', Validators.required],
      state1: ['absent', Validators.required],
      state2: ['absent', Validators.required],
      state3: ['absent', Validators.required],
      state4: ['absent', Validators.required]
    });
  }

  get isFormValid(): boolean {
    return this.wordForm.valid &&
      Object.keys(this.wordForm.controls).every(key =>
        this.wordForm.get(key)?.value !== '');
  }

  addAttempt() {
    if (this.attempts.length >= 6) {
      return;
    }

    const letters: LetterState[] = [];

    for (let i = 0; i < 5; i++) {
      letters.push({
        letter: this.wordForm.get(`letter${i}`)?.value,
        state: this.wordForm.get(`state${i}`)?.value
      });
    }

    this.attempts.push({ letters });
    console.log('attempts: ', this.attempts);
    this.updateSuggestions();
    console.log('suggestions: ', this.suggestions);
    this.wordForm.reset();
  }

  updateSuggestions() {
    this.suggestions = this.wordList.filter(word => {
      return this.attempts.every(attempt => {
        return attempt.letters.every((letterState, index) => {
          const currentLetter = word[index];

          switch (letterState.state) {
            case 'correct':
              if (letterState.letter.toLowerCase() !== currentLetter) {
                return false;
              }
              break;
            case 'present':
              if (!word.includes(letterState.letter.toLowerCase()) ||
                letterState.letter.toLowerCase() === currentLetter) {
                return false;
              }
              break;
            case 'absent':
              if (word.includes(letterState.letter.toLowerCase())) {
                const isLetterMarkedElsewhere = attempt.letters.some(
                  (other, otherIndex) =>
                    index !== otherIndex &&
                    other.letter === letterState.letter &&
                    (other.state === 'correct' || other.state === 'present')
                );
                if (!isLetterMarkedElsewhere) {
                  return false;
                }
              }
              break;
          }
          return true;
        });
      });
    });
  }
}
