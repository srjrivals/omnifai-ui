// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'call-center-app';

  ngOnInit() {
    document.getElementById("menu-toggle")?.addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("wrapper")?.classList.toggle("toggled");
    });
  }
}