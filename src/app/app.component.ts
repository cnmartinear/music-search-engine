import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'music-search-engine';
  theme = 'light';
  darkMode : boolean = false;

  toggleTheme() : void {
     if (this.theme == 'light') this.theme = 'dark';
     else this.theme = 'light';
  }
}
