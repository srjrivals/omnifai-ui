import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.scss'
})
export class CallsComponent {
  pageTitle = 'Calls';

  constructor(private navbarService: NavbarService) {}
  
  ngOnInit() {
    this.navbarService.setPageTitle(this.pageTitle);
  }

}
