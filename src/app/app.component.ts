// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AttemptInputComponent } from './components/attempt-input/attempt-input.component';
import { AttemptsDisplayComponent } from './components/attempts-display/attempts-display.component';
import { WordSuggestionsComponent } from './components/word-suggestions/word-suggestions.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    AttemptInputComponent,
    AttemptsDisplayComponent,
    WordSuggestionsComponent,
    MatSlideToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
  }
}
