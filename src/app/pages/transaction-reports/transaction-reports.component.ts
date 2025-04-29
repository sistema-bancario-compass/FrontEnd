import { Component, OnInit } from '@angular/core';
import { SelectPrimaryComponent } from '../../components/ui/select-primary/select-primary.component';
import { Customer, CustomerService } from '../../core/services/customer.service';
import { Account, AccountService } from '../../core/services/account.service';
import { ButtonComponent } from "../../components/ui/button/button.component";

@Component({
  selector: 'app-transaction-reports',
  imports: [SelectPrimaryComponent, ButtonComponent],
  templateUrl: './transaction-reports.component.html',
  styleUrl: './transaction-reports.component.scss'
})
export class TransactionReportsComponent implements OnInit {
  customers: Customer[] = [];
  accounts: Account[] = [];

  selectedCustomer = '';
  selectedAccount = '';

constructor(
  private customerService: CustomerService,
  private accountService: AccountService
) {}

ngOnInit() {
  this.customerService.getAll().subscribe(data => this.customers = data);
  this.accountService.getAll().subscribe(data => this.accounts = data);
}
}
