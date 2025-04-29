import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces
interface Customer {
  id: string;
  name: string;
  email: string;
  birthdate: string;
}

interface Message {
  text: string;
  type: 'error' | 'success';
}

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss'],
  standalone: true, // Adicione esta linha
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CustomerRegistrationComponent implements OnInit {
  // Estado do componente
  activeTab: 'new' | 'update' = 'new';
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
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

  constructor() {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // Métodos de navegação
  onBack(): void {
    // Implementar lógica de navegação de volta
    console.log('Navegando de volta...');
  }

  // Métodos de manipulação de abas
  setActiveTab(tab: 'new' | 'update'): void {
    this.activeTab = tab;
    this.resetForm();
    this.clearMessage();
  }

  // Métodos de formulário
  handleInputChange(event: any): void {
    const { name, value } = event.target;
    this.formData = {
      ...this.formData,
      [name]: value
    };
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

  // Métodos de validação
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

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(this.formData.birthdate)) {
      this.showMessage('Please enter a valid date (YYYY-MM-DD)', 'error');
      return false;
    }

    return true;
  }

  // Métodos de manipulação de dados
  loadCustomers(): void {
    // Aqui você implementaria a lógica para carregar os clientes do seu serviço
    // Por enquanto, vamos usar um array vazio
    this.customers = [];
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

  // Métodos utilitários
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
    // Limpar a mensagem após 5 segundos
    setTimeout(() => this.clearMessage(), 5000);
  }

  clearMessage(): void {
    this.message = { text: '', type: 'success' };
  }
}
