import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  customers = [
    {
      id: 'C00001',
      name: 'Alice Silva',
      email: 'alice.silva@example.com',
      birthDate: '1990-04-21'
    },
    {
      id: 'C00002',
      name: 'Bob Esponja',
      email: 'bob@abacaxi.com',
      birthDate: '1986-07-14'
    },
    {
      id: 'C00003',
      name: 'Carlos Souza',
      email: 'carlos.souza@example.com',
      birthDate: '1978-12-09'
    }
  ];

  selectedCustomer: any = null;

  accounts = [
    {
      customerId: 'C00001',
      id: 'A001',
      type: 'Checking',
      balance: 1250.75
    },
    {
      customerId: 'C00001',
      id: 'A002',
      type: 'Savings',
      balance: 3620.90
    },
    {
      customerId: 'C00002',
      id: 'A003',
      type: 'Checking',
      balance: 980.15
    }
  ];

  transactions = [
    {
      customerId: 'C00001',
      date: '2025-04-20',
      type: 'credit',
      amount: 1500,
      description: 'Salary'
    },
    {
      customerId: 'C00001',
      date: '2025-04-22',
      type: 'debit',
      amount: 300,
      description: 'Grocery Shopping'
    },
    {
      customerId: 'C00002',
      date: '2025-04-21',
      type: 'debit',
      amount: 100,
      description: 'Subscription Service'
    }
  ];

  get filteredAccounts() {
    return this.selectedCustomer
      ? this.accounts.filter(a => a.customerId === this.selectedCustomer.id)
      : [];
  }

  get filteredTransactions() {
    return this.selectedCustomer
      ? this.transactions.filter(t => t.customerId === this.selectedCustomer.id)
      : [];
  }
}