import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Customer {
  id: string;
  name: string;
  email: string;
  birthdate: string;
}

interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
}

interface Message {
  text: string;
  type: 'error' | 'success';
}

@Component({
  selector: 'app-customer-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
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
    birthdate: ''
  };

  message: Message = {
    text: '',
    type: 'success'
  };

  transactions: Transaction[] = [
    // ... seus dados de transações existentes ...
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  initializeDates(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    this.minDate = minDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.initializeDates();
  }

  loadCustomers(): void {
    const uniqueCustomers = new Map();
    
    this.transactions.forEach(t => {
      if (!uniqueCustomers.has(t.customerId)) {
        uniqueCustomers.set(t.customerId, {
          id: t.customerId,
          name: t.customerName,
          email: t.customerEmail,
          birthdate: ''
        });
      }
    });
    
    this.customers = Array.from(uniqueCustomers.values());
  }

  handleInputChange(event: any): void {
    const value = event?.target?.value ?? event;
    const name = event?.target?.name;

    if (name) {
      this.formData = {
        ...this.formData,
        [name]: value
      };
    } else if (typeof event === 'string') {
      // Assume it's a birthdate input
      this.formData = {
        ...this.formData,
        birthdate: value
      };
    }
  }

  handleCustomerSelect(event: any): void {
    const selectedId = event.target.value;
    if (selectedId) {
      this.selectedCustomer = this.customers.find(c => c.id === selectedId) || null;
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

    try {
      if (this.activeTab === 'new') {
        this.addCustomer();
      } else {
        this.updateCustomer();
      }
    } catch (error) {
      this.showMessage('An error occurred while processing your request.', 'error');
    }
  }

  validateForm(): boolean {
    if (!this.formData.name.trim() || !this.formData.email.trim() || !this.formData.birthdate) {
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
    const lastId = this.customers.length > 0 
      ? parseInt(this.customers[this.customers.length - 1].id.substring(1))
      : 0;
    
    const newId = `C${String(lastId + 1).padStart(5, '0')}`;
    const newCustomer: Customer = {
      ...this.formData,
      id: newId
    };

    this.customers = [...this.customers, newCustomer];
    this.showMessage(`Customer registered successfully with ID: ${newId}`, 'success');
    this.resetForm();
  }

  updateCustomer(): void {
    if (!this.selectedCustomer) {
      this.showMessage('No customer selected', 'error');
      return;
    }

    this.customers = this.customers.map(customer => 
      customer.id === this.selectedCustomer?.id 
        ? { ...this.formData, id: this.selectedCustomer.id }
        : customer
    );
    
    this.showMessage('Customer updated successfully', 'success');
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      id: '',
      name: '',
      email: '',
      birthdate: ''
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
