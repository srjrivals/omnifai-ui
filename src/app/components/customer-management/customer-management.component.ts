import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { NavbarService } from '../../services/navbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit, OnDestroy {

  pageName = 'list';

  pageTitle = 'Customer Management';
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

  constructor(private router: Router,
    private route: ActivatedRoute, private customerService: CustomerService, private navbarService: NavbarService) { }

  ngOnDestroy(): void {
    this.navbarService.setMenuItems([]);
  }

  ngOnInit(): void {
    this.navbarService.setPageTitle(this.pageTitle);
    this.navbarService.setMenuItems([
      { label: 'Customer List', action: this.showCustomerList.bind(this), class: 'btn-secondary' },
      { label: 'Upload', action: this.uploadCustomers.bind(this), class: 'btn-success' }
    ]);

    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.filterAndSortCustomers();
    });
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
    this.page = 1;  // Reset to first page on new search
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

  showCustomerList() {
    this.router.navigate(['list'], { relativeTo: this.route });
  }

  uploadCustomers() {
    this.router.navigate(['upload'], { relativeTo: this.route });
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

    // Apply pagination after filtering and sorting
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredCustomers = filtered.slice(startIndex, endIndex);
  }

  setPage(page: number): void {
    this.page = page;
    this.filterAndSortCustomers();
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.page = 1; // Reset to first page when page size changes
    this.filterAndSortCustomers();
  }
}