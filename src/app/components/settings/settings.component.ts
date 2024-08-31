import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  pageTitle = 'Settings';

  constructor(private navbarService: NavbarService) {}
  
  ngOnInit() {
    this.navbarService.setPageTitle(this.pageTitle);
  }

}
