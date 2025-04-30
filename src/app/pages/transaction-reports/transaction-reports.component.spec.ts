import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionReportsComponent } from './transaction-reports.component';
import { CustomerService } from '../../core/services/customer.service';
import { AccountService } from '../../core/services/account.service';
import { of } from 'rxjs';
import { SelectPrimaryComponent } from '../../components/ui/select-primary/select-primary.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { BackButtonComponent } from '../../components/ui/back-button/back-button.component';
import { TransactionService } from '../../core/services/transactions.service';

describe('TransactionReportsComponent', () => {
  let component: TransactionReportsComponent;
  let fixture: ComponentFixture<TransactionReportsComponent>;

  const mockCustomers = [
    { id: '1', name: 'Customer A' },
    { id: '2', name: 'Customer B' },
  ];

  const mockAccounts = [
    { id: '10', type: 'Checking', customerId: '1', balance: 500 },
    { id: '20', type: 'Savings', customerId: '2', balance: 1000 },
  ];

  const mockTransactions = [
    { id: 't1', date: '2024-01-01', customerId: '1', accountId: '10', type: 'DEBIT', amount: 100, description: 'Test' },
    { id: 't2', date: '2024-01-05', customerId: '2', accountId: '20', type: 'CREDIT', amount: 200, description: 'Another' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionReportsComponent,
        SelectPrimaryComponent,
        ButtonComponent,
        BackButtonComponent,
      ],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            getAll: () => of(mockCustomers),
          },
        },
        {
          provide: AccountService,
          useValue: {
            getAll: () => of(mockAccounts),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load customers on init', () => {
    expect(component.customers.length).toBe(2);
    expect(component.customers[0].name).toBe('Customer A');
  });

  it('should load accounts on init', () => {
    expect(component.accounts.length).toBe(2);
    expect(component.accounts[1].type).toBe('Savings');
  });

  it('should render the title and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h2');
    const description = compiled.querySelector('p');
    expect(title?.textContent).toContain('Transaction Reports');
    expect(description?.textContent).toContain('Generate transaction reports');
  });

  it('should render select for customers and accounts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const customerSelect = compiled.querySelector(
      'app-select-primary[name="selectCustomer"]'
    );
    const accountSelect = compiled.querySelector(
      'app-select-primary[name="selectAccount"]'
    );
    expect(customerSelect).toBeTruthy();
    expect(accountSelect).toBeTruthy();
  });

  it('should render two date inputs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dateInputs = compiled.querySelectorAll('input[type="date"]');
    expect(dateInputs.length).toBe(2);
  });

  it('should render the generate report button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('app-button');
    expect(button?.getAttribute('label')).toBe('Generate Report');
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionReportsComponent, SelectPrimaryComponent, ButtonComponent, BackButtonComponent],
      providers: [
        { provide: CustomerService, useValue: { getAll: () => of(mockCustomers) } },
        { provide: AccountService, useValue: { getAll: () => of(mockAccounts) } },
        { provide: TransactionService, useValue: { getAll: () => of(mockTransactions) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TransactionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should filter transactions by selected customer and date range', () => {
    component.selectedCustomer = '1';
    component.startDate = '2024-01-01';
    component.endDate = '2024-01-10';
  
    component.generateReport();
  
    expect(component.transactions.length).toBe(1);
    expect(component.transactions[0].id).toBe('t1');
  });

  it('should clear report data', () => {
    component.selectedCustomer = '1';
    component.selectedAccount = '10';
    component.startDate = '2024-01-01';
    component.endDate = '2024-01-10';
    component.transactions = [{ id: 't1', date: '2024-01-01', customerId: '1', accountId: '10', type: 'debit', amount: 100, description: 'Test' }];
    component.showResults = true;
  
    component.clearReport();
  
    expect(component.selectedCustomer).toBe('');
    expect(component.selectedAccount).toBe('');
    expect(component.startDate).toBe('');
    expect(component.endDate).toBe('');
    expect(component.transactions.length).toBe(0);
    expect(component.showResults).toBeFalse();
  });
  
});
