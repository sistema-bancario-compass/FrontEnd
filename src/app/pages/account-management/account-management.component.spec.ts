import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementComponent } from './account-management.component';
import { CustomerService } from '../../core/services/customer.service';
import { AccountService } from '../../core/services/account.service';
import { of } from 'rxjs';

describe('AccountManagementComponent', () => {
  let component: AccountManagementComponent;
  let fixture: ComponentFixture<AccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountManagementComponent],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            getAll: () => of([]),
          },
        },
        {
          provide: AccountService,
          useValue: {
            getAll: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Account Management'
    );
  });

  it('should render the tabs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.tabs button');
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toContain('Create Account');
    expect(buttons[1].textContent).toContain('Deposit');
    expect(buttons[2].textContent).toContain('Withdraw');
  });

  it('should render "Select Customer (Optional)" label when on create tab', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector(
        'app-select-primary[label="Select Customer (Optional)"]'
      )
    ).toBeTruthy();
  });

  it('should render "Account Type" label when on create tab', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('app-select-primary[label="Account Type"]')
    ).toBeTruthy();
  });

  it('should change to deposit tab and show amount input', () => {
    component.selectTab('deposit');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('app-input-primary[label="Amount"]')
    ).toBeTruthy();
  });

  it('should render submit button with correct text on create tab', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '.action-button'
    ) as HTMLButtonElement;
    expect(button.textContent?.trim()).toBe('Create Account');
  });

  it('should render submit button with correct text on deposit tab', () => {
    component.selectTab('deposit');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '.action-button'
    ) as HTMLButtonElement;
    expect(button.textContent?.trim()).toBe('Make Deposit');
  });

  it('should render submit button with correct text on withdraw tab', () => {
    component.selectTab('withdraw');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '.action-button'
    ) as HTMLButtonElement;
    expect(button.textContent?.trim()).toBe('Make Withdrawal');
  });
});
