import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'bpm-wireframe';
  isLoggedIn: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {  
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
      window.addEventListener('storage', () => {
        this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
      });
    }
  }
}
