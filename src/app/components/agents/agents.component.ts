import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../../services/agent.service';
import { CallLogService } from '../../services/call-log.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { CallLog } from '../../models/call-log.model';
import { Agent } from '../../models/agent.model';
import { catchError, of } from 'rxjs';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  pageTitle = 'Agents'
  customers: Customer[] = [];
  paginatedCustomers: Customer[] = [];
  agents: Agent[] = [];
  callLogsToday: { [customerId: number]: CallLog[] } = {};
  callLogsThisWeek: { [customerId: number]: CallLog[] } = {};

  agentForm: FormGroup;

  showAddAgentForm = false;

  currentSection: 'list' | 'add' = 'list';

  page = 1;
  pageSize = 10;

  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private callLogService: CallLogService,
    private customerService: CustomerService,
    private navbarService: NavbarService
  ) {
    this.agentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      agentType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.navbarService.setPageTitle(this.pageTitle);
    this.navbarService.setMenuItems([
      { label: 'Customer List', action: () => this.showSection('list'), class: 'btn-secondary active' },
      { label: 'Agents', action: () => this.showSection('add'), class: 'btn-secondary' }
    ]);
    this.getCustomersWithCallData();
    this.loadAgents();
  }

  getCustomersWithCallData(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;

      // Fetch call data for each customer
      this.customers.forEach(customer => {
        this.getCallDataForCustomer(customer);
      });
    });
  }

  getCallDataForCustomer(customer: Customer): void {
    let todayCallsFetched = false;
    let weekCallsFetched = false;

    // Get calls for today
    this.callLogService.getCallsForCustomer(customer.id)
      .pipe(
        catchError(error => {
          console.error('Error fetching calls for today', error);
          return of([]); // Return an empty array if there's an error
        })
      )
      .subscribe(calls => {
        customer.callsToday = calls.length;
        customer.callsThisWeek = calls.length;
        this.updateCustomerInList(customer);
        todayCallsFetched = true;
        this.checkIfDataLoadingComplete(todayCallsFetched, weekCallsFetched, customer);
      });
  }
  
  checkIfDataLoadingComplete(todayCallsFetched: boolean, weekCallsFetched: boolean, customer: Customer) {
    if (todayCallsFetched && weekCallsFetched) {
      const index = this.customers.findIndex(c => c.id === customer.id);
      this.customers[index] = { ...customer };
    }
  }

  toggleAddAgentForm(): void {
    this.showAddAgentForm = !this.showAddAgentForm;
  }

  addAgent(): void {
    if (this.agentForm.valid) {
      const newAgent = {
        firstName: this.agentForm.get('firstName')?.value,
        lastName: this.agentForm.get('lastName')?.value,
        agentType: this.agentForm.get('agentType')?.value,
        status: 'Active'
      };

      this.agentService.addAgent(newAgent).subscribe(response => {
        console.log('Agent added successfully:', response);
        // Optionally reset the form and hide the form
        this.agentForm.reset();
        this.showAddAgentForm = false;
        this.loadAgents();
      }, error => {
        console.error('Error adding agent:', error);
      });
    }
  }

  loadAgents(): void {
    this.agentService.getAgents().subscribe(
      (agents: Agent[]) => {
        this.agents = agents;
      },
      (error) => {
        console.error('Error loading agents:', error);
      }
    );
  }

  showSection(section: 'list' | 'add'): void {
    this.currentSection = section;
    this.navbarService.setMenuItems([
      { label: 'Customer List', action: () => this.showSection('list'), class: section === 'list' ? 'btn-primary' : 'btn-secondary' },
      { label: 'Agents', action: () => this.showSection('add'), class: section === 'add' ? 'btn-primary' : 'btn-secondary' }
    ]);
  }

  updateCustomerInList(updatedCustomer: Customer): void {
    const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
    if (index !== -1) {
      this.customers[index] = { ...updatedCustomer };
      this.setPage(this.page); // Update pagination after data update
    }
  }

  setPage(page: number): void {
    this.page = page;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCustomers = this.customers.slice(start, end);
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.setPage(1); // Reset to first page
  }
}