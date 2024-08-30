// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'call-center-app';
  isMenuOpen = true;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const wrapper = document.getElementById('sidebar-wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
    }
  }

  ngOnInit() {
    document.getElementById("menu-toggle")?.addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("wrapper")?.classList.toggle("toggled");
    });
  }
}