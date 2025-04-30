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
    {
      id: 'T00001',
      customerId: 'C00001',
      customerName: 'John Doe',
      customerEmail: 'john@email.com',
      date: '2025-04-20',
      type: 'credit',
      amount: 1500,
      description: 'Salary'
    },
    {
      id: 'T00002',
      customerId: 'C00001',
      customerName: 'John Doe',
      customerEmail: 'john@email.com',
      date: '2025-04-22',
      type: 'debit',
      amount: 300,
      description: 'Grocery Shopping'
    },
    {
      id: 'T00003',
      customerId: 'C00002',
      customerName: 'Maria Silva',
      customerEmail: 'maria@email.com',
      date: '2025-04-21',
      type: 'credit',
      amount: 2000,
      description: 'Freelance Payment'
    },
    {
      id: 'T00004',
      customerId: 'C00002',
      customerName: 'Maria Silva',
      customerEmail: 'maria@email.com',
      date: '2025-04-23',
      type: 'debit',
      amount: 150.50,
      description: 'Internet Bill'
    },
    {
      id: 'T00005',
      customerId: 'C00003',
      customerName: 'Carlos Santos',
      customerEmail: 'carlos@email.com',
      date: '2025-04-20',
      type: 'credit',
      amount: 3000,
      description: 'Investment Return'
    },
    {
      id: 'T00006',
      customerId: 'C00003',
      customerName: 'Carlos Santos',
      customerEmail: 'carlos@email.com',
      date: '2025-04-24',
      type: 'debit',
      amount: 800,
      description: 'Rent Payment'
    },
    {
      id: 'T00007',
      customerId: 'C00004',
      customerName: 'Ana Oliveira',
      customerEmail: 'ana@email.com',
      date: '2025-04-21',
      type: 'credit',
      amount: 2500,
      description: 'Monthly Salary'
    },
    {
      id: 'T00008',
      customerId: 'C00004',
      customerName: 'Ana Oliveira',
      customerEmail: 'ana@email.com',
      date: '2025-04-25',
      type: 'debit',
      amount: 450,
      description: 'Utility Bills'
    }
  ];

  get filteredTransactions() {
    return this.selectedCustomer
      ? this.transactions.filter((t: Transaction) => t.customerId === this.selectedCustomer?.id)
      : [];
  }

  get totalCredits() {
    return this.filteredTransactions
      .filter((t: Transaction) => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get totalDebits() {
    return this.filteredTransactions
      .filter((t: Transaction) => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get balance() {
    return this.totalCredits - this.totalDebits;
  }

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
  }

  loadCustomers(): void {
    // Criando um Set para obter customers únicos das transactions
    const uniqueCustomers = new Set(
      this.transactions.map(t => JSON.stringify({
        id: t.customerId,
        name: t.customerName,
        email: t.customerEmail
      }))
    );
    this.customers = Array.from(uniqueCustomers).map(customer => {
      const { id, name, email } = JSON.parse(customer);
      return {
        id,
        name,
        email,
        birthdate: '' 
      };
    });
  }

  handleInputChange(event: any): void {
    if (event instanceof Event) {
      const { name, value } = event.target as HTMLInputElement;
      this.formData = {
        ...this.formData,
        [name]: value
      };
    } else {
      this.formData = {
        ...this.formData,
        birthdate: event
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
    if (!this.formData.name || !this.formData.email || !this.formData.birthdate) {
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
    const newId = `C${String(this.customers.length + 1).padStart(5, '0')}`;
    const newCustomer: Customer = {
      ...this.formData,
      id: newId
    };

    this.customers.push(newCustomer);
    this.showMessage(`Customer registered successfully with ID: ${newId}`, 'success');
    this.resetForm();
  }

  updateCustomer(): void {
    if (!this.selectedCustomer) {
      this.showMessage('No customer selected', 'error');
      return;
    }

    const index = this.customers.findIndex(c => c.id === this.selectedCustomer?.id);
    if (index !== -1) {
      this.customers[index] = {
        ...this.formData,
        id: this.selectedCustomer.id
      };
      this.showMessage('Customer updated successfully', 'success');
    }
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
