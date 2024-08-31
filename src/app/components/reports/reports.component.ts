import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  pageTitle = 'Reports';

  constructor(private navbarService: NavbarService) {}
  
  ngOnInit() {
    this.navbarService.setPageTitle(this.pageTitle);
  }

}
