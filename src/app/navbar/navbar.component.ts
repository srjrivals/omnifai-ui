import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public pageTitle: string = '';
  public menuItems: { label: string, action: () => void, class?: string }[] = [];
  isMenuOpen = true;

  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    this.navbarService.pageTitle$.subscribe(title => this.pageTitle = title);
    this.navbarService.menuItems$.subscribe(items => this.menuItems = items);
  }

  toggleMenu() {
    const wrapper = document.getElementById('sidebar-wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}