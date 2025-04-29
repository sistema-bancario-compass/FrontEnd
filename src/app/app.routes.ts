import { Routes } from '@angular/router';
import { CustomerRegistrationComponent } from './pages/customer-registration/customer-registration.component';
import { AccountManagementComponent } from './pages/account-management/account-management.component';
import { TransactionReportsComponent } from './pages/transaction-reports/transaction-reports.component';
import { CustomerInformationComponent } from './pages/customer-information/customer-information.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';

export const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'customer-registration', component: CustomerRegistrationComponent },
  { path: 'account-management', component: AccountManagementComponent },
  { path: 'transaction-reports', component: TransactionReportsComponent },
  { path: 'customer-information', component: CustomerInformationComponent },
];
