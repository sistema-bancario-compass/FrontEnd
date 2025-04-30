import { Component, OnInit } from '@angular/core';
import { SelectPrimaryComponent } from '../../components/ui/select-primary/select-primary.component';
import {
  Customer,
  CustomerService,
} from '../../core/services/customer.service';
import { Account, AccountService } from '../../core/services/account.service';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { BackButtonComponent } from '../../components/ui/back-button/back-button.component';
import {
  Transaction,
  TransactionService,
} from '../../core/services/transactions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-reports',
  imports: [
    SelectPrimaryComponent,
    ButtonComponent,
    BackButtonComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './transaction-reports.component.html',
  styleUrl: './transaction-reports.component.scss',
})
export class TransactionReportsComponent implements OnInit {
  customers: Customer[] = [];
  accounts: Account[] = [];
  transactions: Transaction[] = [];

  selectedCustomer = '';
  selectedAccount = '';
  startDate = '';
  endDate = '';
  showResults = false;

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.customerService.getAll().subscribe((data) => (this.customers = data));
    this.accountService.getAll().subscribe((data) => (this.accounts = data));
  }
  generateReport() {
    this.transactionService.getAll().subscribe((transactions) => {
      this.transactions = transactions.filter((t) => {
        const matchesCustomer = !this.selectedCustomer;
        const matchesAccount =
          !this.selectedAccount || t.source === this.selectedAccount;
        const matchesStartDate =
          !this.startDate || new Date(t.date) >= new Date(this.startDate);
        const matchesEndDate =
          !this.endDate || new Date(t.date) <= new Date(this.endDate);
        return (
          matchesCustomer &&
          matchesAccount &&
          matchesStartDate &&
          matchesEndDate
        );
      });
      this.showResults = true;
    });
  }
  clearReport() {
    this.selectedCustomer = '';
    this.selectedAccount = '';
    this.startDate = '';
    this.endDate = '';
    this.transactions = [];
    this.showResults = false;
  }
}
