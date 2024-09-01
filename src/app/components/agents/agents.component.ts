import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../../services/agent.service';
import { CallLogService } from '../../services/call-log.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { CallLog } from '../../models/call-log.model';
import { Agent } from '../../models/agent.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  pageTitle = 'Agents'
  customers: Customer[] = [];
  agents: Agent[] = [];
  callLogsToday: { [customerId: number]: CallLog[] } = {};
  callLogsThisWeek: { [customerId: number]: CallLog[] } = {};

  agentForm: FormGroup;

  showAddAgentForm = false;

  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private callLogService: CallLogService,
    private customerService: CustomerService
  ) {
    this.agentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      agentType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
    this.callLogService.getCallsForToday(customer.id)
      .pipe(
        catchError(error => {
          console.error('Error fetching calls for today', error);
          return of([]); // Return an empty array if there's an error
        })
      )
      .subscribe(callsToday => {
        customer.callsToday = callsToday.length;
        todayCallsFetched = true;
        this.checkIfDataLoadingComplete(todayCallsFetched, weekCallsFetched, customer);
      });
  
    // Get calls for this week
    this.callLogService.getCallsForThisWeek(customer.id)
      .pipe(
        catchError(error => {
          console.error('Error fetching calls for this week', error);
          return of([]); // Return an empty array if there's an error
        })
      )
      .subscribe(callsThisWeek => {
        customer.callsThisWeek = callsThisWeek.length;
        weekCallsFetched = true;
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
}