import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import words from 'an-array-of-english-words';

export interface LetterState {
  letter: string;
  state: 'correct' | 'present' | 'absent';
}

export interface WordAttempt {
  letters: LetterState[];
}

@Injectable({
  providedIn: 'root'
})
export class WordleService {
  private wordList: string[] = words.filter(word => word.length === 5);
  private attemptsSubject = new BehaviorSubject<WordAttempt[]>([]);
  private suggestionsSubject = new BehaviorSubject<string[]>([]);

  attempts$ = this.attemptsSubject.asObservable();
  suggestions$ = this.suggestionsSubject.asObservable();

  addAttempt(attempt: WordAttempt) {
    const currentAttempts = this.attemptsSubject.value;
    if (currentAttempts.length >= 6) return;

    const newAttempts = [...currentAttempts, attempt];
    this.attemptsSubject.next(newAttempts);
    this.updateSuggestions(newAttempts);
  }

  private updateSuggestions(attempts: WordAttempt[]) {
    const suggestions = this.wordList.filter(word => {
      return attempts.every(attempt => {
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
    this.suggestionsSubject.next(suggestions);
  }
}
