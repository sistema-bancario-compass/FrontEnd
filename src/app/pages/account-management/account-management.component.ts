import { Component } from '@angular/core';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [InputPrimaryComponent, CommonModule],
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent {
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
      // Aqui você chama a função de criar conta
    } else if (this.selectedTab === 'deposit') {
      console.log('Making deposit...');
      // Aqui você chama a função de depósito
    } else if (this.selectedTab === 'withdraw') {
      console.log('Making withdrawal...');
      // Aqui você chama a função de saque
    }
  }
}
