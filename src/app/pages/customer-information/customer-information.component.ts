import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer, CustomerService } from '../../core/services/customer.service';
import { Account, AccountService } from '../../core/services/account.service';
import { Transaction, TransactionService } from '../../core/services/transactions.service';

@Component({
  selector: 'app-customer-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {
  constructor(private router: Router, 
    private customerService: CustomerService,
    private accountService: AccountService,
    private transactionService: TransactionService,) {}

  customers: Customer[] = [];
  accounts: Account[] = [];
  transactions: Transaction[] = [];
    
  selectedCustomer: Customer | null = null;

  ngOnInit(): void {
  this.customerService.getAll().subscribe((data) => (this.customers = data));
  this.accountService.getAll().subscribe((data) => (this.accounts = data));
  this.transactionService.getAll().subscribe((data) => (this.transactions = data));
    }

  goBack() {
    this.router.navigate(['/']);
  }

  get filteredAccounts(): Account[] {
    return this.selectedCustomer
      ? this.accounts.filter(a => a.customerId === this.selectedCustomer!.id)
      : [];
  }

  get filteredTransactions(): Transaction[] {
    return this.selectedCustomer
      ? this.transactions.filter(t => t.customerId === this.selectedCustomer!.id)
      : [];
  }
}