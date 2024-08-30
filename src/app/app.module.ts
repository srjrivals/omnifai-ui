import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import Bootstrap module for Angular
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for API calls

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CallsComponent } from './components/calls/calls.component';
import { AgentsComponent } from './components/agents/agents.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component'; // Import your component

import { CustomerService } from './services/customer.service'; // Import your service

// Define routes for the application
const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calls', component: CallsComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'customers', component: CustomerManagementComponent }, // Add the route for Customer Management
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CallsComponent,
    AgentsComponent,
    ReportsComponent,
    SettingsComponent,
    CustomerManagementComponent // Declare your component
  ],
  imports: [
    BrowserModule,
    NgbModule,           // Bootstrap module for Angular
    FormsModule,         // Import FormsModule to enable ngModel for template-driven forms
    ReactiveFormsModule, // Import ReactiveFormsModule for reactive forms
    HttpClientModule,    // Import HttpClientModule for making HTTP requests
    RouterModule.forRoot(appRoutes) // Routing module for the application
  ],
  providers: [
    CustomerService // Provide your service so it can be injected
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }