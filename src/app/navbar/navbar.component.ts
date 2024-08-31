import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
  activeMenu: string = '';

  constructor(private navbarService: NavbarService, private router: Router) {}

  ngOnInit() {
    this.navbarService.pageTitle$.subscribe(title => this.pageTitle = title);
    this.navbarService.menuItems$.subscribe(items => this.menuItems = items);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveMenu();
      }
    });
  }

  toggleMenu() {
    const wrapper = document.getElementById('sidebar-wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

  setActiveMenu() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('list')) {
      this.activeMenu = 'Customer List';
    } else if (currentUrl.includes('upload')) {
      this.activeMenu = 'Upload';
    }
  }
}