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
  selectedCustomer: Customer | null = null;
  maxDate: string = '';
  minDate: string = '';
  dateError: string = '';
  isValidDate: boolean = true;
  
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

  customers: Customer[] = [
    {
      id: 'C00001',
      name: 'John Doe',
      email: 'john@email.com',
      birthdate: '1990-01-15'
    },
    {
      id: 'C00002',
      name: 'Maria Silva',
      email: 'maria@email.com',
      birthdate: '1985-03-22'
    },
    {
      id: 'C00003',
      name: 'Carlos Santos',
      email: 'carlos@email.com',
      birthdate: '1992-07-10'
    },
    {
      id: 'C00004',
      name: 'Ana Oliveira',
      email: 'ana@email.com',
      birthdate: '1988-11-30'
    },
    {
      id: 'C00005',
      name: 'Pedro Alves',
      email: 'pedro@email.com',
      birthdate: '1995-05-20'
    },
    {
      id: 'C00006',
      name: 'Sofia Lima',
      email: 'sofia@email.com',
      birthdate: '1993-09-12'
    }
  ];

  constructor(private router: Router) {
    this.initializeDates();
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  initializeDates(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    this.minDate = minDate.toISOString().split('T')[0];
  }

  loadCustomers(): void {
    try {
      if (this.customers.length === 0) {
        this.showMessage('No customers found', 'error');
      }
    } catch (error) {
      this.showMessage('Error loading customers', 'error');
    }
  }

  handleInputChange(event: Event | string): void {
    try {
      if (event instanceof Event) {
        const { name, value } = event.target as HTMLInputElement;
        
        if (name === 'birthdate') {
          if (this.validateDate(value)) {
            this.formData = {
              ...this.formData,
              [name]: value
            };
            this.dateError = '';
            this.isValidDate = true;
          }
        } else {
          this.formData = {
            ...this.formData,
            [name]: value
          };
        }
      } else {
        if (this.validateDate(event)) {
          this.formData = {
            ...this.formData,
            birthdate: event
          };
          this.dateError = '';
          this.isValidDate = true;
        }
      }
    } catch (error) {
      this.showMessage('Error updating form', 'error');
    }
  }

  validateDate(dateStr: string): boolean {
    try {
      // Verifica se a data está no formato correto
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        this.dateError = 'Invalid date format. Use YYYY-MM-DD';
        this.isValidDate = false;
        return false;
      }

      const date = new Date(dateStr);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 100);

      // Verifica se é uma data válida
      if (isNaN(date.getTime())) {
        this.dateError = 'Invalid date';
        this.isValidDate = false;
        return false;
      }

      // Verifica se a data está no futuro
      if (date > today) {
        this.dateError = 'Birth date cannot be in the future';
        this.isValidDate = false;
        return false;
      }

      // Verifica se a data é muito antiga (mais de 100 anos)
      if (date < minDate) {
        this.dateError = 'Birth date cannot be more than 100 years ago';
        this.isValidDate = false;
        return false;
      }

      // Verifica se o mês e dia são válidos
      const [year, month, day] = dateStr.split('-').map(Number);
      const inputDate = new Date(year, month - 1, day);
      if (inputDate.getMonth() !== month - 1 || inputDate.getDate() !== day) {
        this.dateError = 'Invalid date';
        this.isValidDate = false;
        return false;
      }

      return true;
    } catch (error) {
      this.dateError = 'Error validating date';
      this.isValidDate = false;
      return false;
    }
  }

  handleCustomerSelect(event: Event): void {
    try {
      const target = event.target as HTMLSelectElement;
      const selectedId = target.value;

      if (selectedId) {
        this.selectedCustomer = this.customers.find(c => c.id === selectedId) || null;
        if (this.selectedCustomer) {
          this.formData = { ...this.selectedCustomer };
        }
      } else {
        this.selectedCustomer = null;
        this.resetForm();
      }
    } catch (error) {
      this.showMessage('Error selecting customer', 'error');
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
      this.showMessage('Error processing request', 'error');
    }
  }

  validateForm(): boolean {
    if (!this.formData.name?.trim() || !this.formData.email?.trim() || !this.formData.birthdate) {
      this.showMessage('All fields are required', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.showMessage('Please enter a valid email address', 'error');
      return false;
    }

    if (!this.isValidDate || this.dateError) {
      this.showMessage(this.dateError || 'Invalid birth date', 'error');
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
      this.resetForm();
    } else {
      this.showMessage('Customer not found', 'error');
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
    this.dateError = '';
    this.isValidDate = true;
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

  goBack(): void {
    this.router.navigate(['/']);
  }
}
