import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Adiciona esta linha
import { InputPrimaryComponent } from '../../components/ui/input-primary/input-primary.component';
import { SelectPrimaryComponent } from '../../components/ui/select-primary/select-primary.component';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [InputPrimaryComponent, CommonModule, BackButtonComponent], // <-- Adiciona o CommonModule aqui
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent {
  constructor(private router: Router) {}
  goBack() {
    this.router.navigate(['/']);
  }

  selectedTab: string = 'create';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  getActionButtonText(): string {
    switch (this.selectedTab) {
      case 'create':
        return 'Create Account';
      case 'deposit':
        return 'Make Deposit';
      case 'withdraw':
        return 'Make Withdrawal';
      default:
        return 'Submit';
    }
  }

  onSubmit() {
    if (this.selectedTab === 'create') {
      console.log('Creating account...');
    } else if (this.selectedTab === 'deposit') {
      console.log('Making deposit...');
    } else if (this.selectedTab === 'withdraw') {
      console.log('Making withdrawal...');
    }
  }
}
