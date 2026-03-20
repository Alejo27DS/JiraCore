import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
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

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {  
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
      window.addEventListener('storage', () => {
        this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
      });
    }
  }
  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
    }

    this.router.navigate([""]);
  }
}
