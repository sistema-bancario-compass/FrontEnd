import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../components/ui/back-button/back-button.component';
import {
  Customer,
  CustomerService,
} from '../../core/services/customer.service';

interface Message {
  text: string;
  type: 'error' | 'success';
}

@Component({
  selector: 'app-customer-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, BackButtonComponent],
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss'],
})
export class CustomerRegistrationComponent implements OnInit {
  activeTab: 'new' | 'update' = 'new';
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  maxDate: string = '';
  minDate: string = '';

  formData: Customer = {
    id: '',
    name: '',
    email: '',
    birthday: '',
    cpf: '',
  };

  message: Message = {
    text: '',
    type: 'success',
  };

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  goBack() {
    this.router.navigate(['/main-menu']);
  }

  initializeDates(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    this.minDate = minDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.initializeDates();
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (customers) => (this.customers = customers),
      error: () => this.showMessage('Failed to load customers', 'error'),
    });
  }

  handleInputChange(event: any): void {
    if (event instanceof Event) {
      const { name, value } = event.target as HTMLInputElement;
      this.formData = {
        ...this.formData,
        [name]: value,
      };
    } else {
      this.formData = {
        ...this.formData,
        birthday: event,
      };
    }
  }

  handleCustomerSelect(event: any): void {
    const selectedId = event.target.value;
    if (selectedId) {
      this.selectedCustomer =
        this.customers.find((c) => c.id === selectedId) || null;
      if (this.selectedCustomer) {
        this.formData = { ...this.selectedCustomer };
      }
    } else {
      this.selectedCustomer = null;
      this.resetForm();
    }
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.validateForm()) {
      return;
    }

    if (this.activeTab === 'new') {
      this.addCustomer();
    } else {
      this.updateCustomer();
    }
  }

  validateForm(): boolean {
    if (
      !this.formData.name ||
      !this.formData.email ||
      !this.formData.birthday ||
      !this.formData.cpf
    ) {
      this.showMessage('All fields are required', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.showMessage('Please enter a valid email address', 'error');
      return false;
    }

    return true;
  }

  addCustomer(): void {
    this.customerService.create(this.formData).subscribe({
      next: (createdCustomer) => {
        this.customers.push(createdCustomer);
        this.showMessage(
          `Customer registered successfully with ID: ${createdCustomer.id}`,
          'success'
        );
        this.resetForm();
      },
      error: () => {
        this.showMessage('Failed to register customer.', 'error');
      },
    });
  }

  updateCustomer(): void {
    if (!this.selectedCustomer) {
      this.showMessage('No customer selected', 'error');
      return;
    }

    const index = this.customers.findIndex(
      (c) => c.id === this.selectedCustomer?.id
    );
    if (index !== -1) {
      this.customers[index] = {
        ...this.formData,
        id: this.selectedCustomer.id,
      };
      this.showMessage('Customer updated successfully', 'success');
    }
  }

  resetForm(): void {
    this.formData = {
      id: '',
      name: '',
      email: '',
      birthday: '',
      cpf: '',
    };
    this.selectedCustomer = null;
  }

  showMessage(text: string, type: 'error' | 'success'): void {
    this.message = { text, type };
    setTimeout(() => this.clearMessage(), 5000);
  }

  clearMessage(): void {
    this.message = { text: '', type: 'success' };
  }

  setActiveTab(tab: 'new' | 'update'): void {
    this.activeTab = tab;
    this.resetForm();
    this.clearMessage();
  }
}
