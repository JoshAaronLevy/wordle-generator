import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WordleService, LetterState } from '../../services/wordle.service';

@Component({
  selector: 'app-attempt-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  templateUrl: `./attempt-input.component.html`,
  styleUrls: ['./attempt-input.component.scss']
})
export class AttemptInputComponent {
  wordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private wordleService: WordleService
  ) {
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
    const letters: LetterState[] = [];
    for (let i = 0; i < 5; i++) {
      letters.push({
        letter: this.wordForm.get(`letter${i}`)?.value,
        state: this.wordForm.get(`state${i}`)?.value
      });
    }
    this.wordleService.addAttempt({ letters });
    this.resetForm();
  }

  private resetForm() {
    this.wordForm.reset({
      letter0: '',
      letter1: '',
      letter2: '',
      letter3: '',
      letter4: '',
      state0: 'absent',
      state1: 'absent',
      state2: 'absent',
      state3: 'absent',
      state4: 'absent'
    });
  }
}
