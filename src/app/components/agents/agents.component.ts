import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss'
})
export class AgentsComponent {
  pageTitle = 'Agents';

  constructor(private navbarService: NavbarService) {}
  
  ngOnInit() {
    this.navbarService.setPageTitle(this.pageTitle);
  }

}
