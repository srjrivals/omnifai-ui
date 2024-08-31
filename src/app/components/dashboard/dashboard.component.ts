import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { NavbarService } from '../../services/navbar.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pageTitle = 'Dashboard';
  totalCalls = 1200;
  resolvedCalls = 900;
  pendingCalls = 200;
  droppedCalls = 100;

  topAgents = [
    { name: 'Agent A', callsHandled: 150 },
    { name: 'Agent B', callsHandled: 120 },
    { name: 'Agent C', callsHandled: 110 },
    { name: 'Agent D', callsHandled: 100 }
  ];

  totalCustomers: number = 0;
  customersReached: number = 0;
  customersYetToBeCalled: number = 0;

  constructor(private navbarService: NavbarService, private customerService: CustomerService) {
    Chart.register(...registerables);
    
  }

  ngOnInit() {
    this.renderCallVolumeChart();
    this.navbarService.setPageTitle(this.pageTitle);
    this.loadCustomerStats();
  }

  loadCustomerStats(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.totalCustomers = customers.length;
      //this.customersReached = customers.filter(c => c.reachedOut).length; // Assuming 'reachedOut' is a boolean in Customer model
      this.customersYetToBeCalled = this.totalCustomers - this.customersReached;
    });
  }

  renderCallVolumeChart() {
    const ctx = (document.getElementById('callVolumeChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Calls',
            data: [50, 75, 100, 150, 200, 175, 125],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Day of the Week'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Calls'
            }
          }
        }
      }
    });
  }
}