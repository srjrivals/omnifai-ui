import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  editingCustomer: Customer | null = null;
  fileToUpload: File | null = null;

  // Pagination parameters
  page = 1;
  pageSize = 10;

  // Search query
  searchQuery = '';

  // Sorting parameters
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.filterAndSortCustomers();
    });
  }

  filterAndSortCustomers(): void {
    let filtered = [...this.customers];

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(customer =>
        customer.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.company.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.phoneNumber.includes(this.searchQuery) ||
        customer.salary.includes(this.searchQuery)
      );
    }

    // Sort by selected column
    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const aValue = (a as any)[this.sortColumn];
        const bValue = (b as any)[this.sortColumn];
        return (aValue > bValue ? 1 : -1) * (this.sortDirection === 'asc' ? 1 : -1);
      });
    }

    this.filteredCustomers = filtered.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  setPage(page: number): void {
    this.page = page;
    this.filterAndSortCustomers();
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.filterAndSortCustomers();
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filterAndSortCustomers();
  }

  search(): void {
    this.filterAndSortCustomers();
  }

  editCustomer(customer: Customer): void {
    this.editingCustomer = { ...customer };
  }

  updateCustomer(): void {
    if (this.editingCustomer) {
      this.customerService.updateCustomer(this.editingCustomer).subscribe(() => {
        this.getCustomers();
        this.editingCustomer = null;
      });
    }
  }

  cancelEdit(): void {
    this.editingCustomer = null;
  }

  deleteCustomer(id: number | undefined): void {
    if (id !== undefined) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.customers = this.customers.filter(c => c.id !== id);
        this.filterAndSortCustomers();
      });
    }
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileToUpload = target.files[0];
    }
  }

  uploadFile(): void {
    if (this.fileToUpload) {
      this.customerService.uploadCustomerFile(this.fileToUpload).subscribe(() => {
        this.getCustomers();
        this.fileToUpload = null;
      });
    }
  }
}