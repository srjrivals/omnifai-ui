// agent.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../models/agent.model';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:8080/api/agents'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.apiUrl}`);
  }

  addAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(`${this.apiUrl}`, agent);
  }

  deleteAgent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  updateCustomerStatus(customerId: number, status: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/customers/${customerId}`, { status });
  }

  logCall(customerId: number, agentId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/calls`, { customerId, agentId });
  }
}