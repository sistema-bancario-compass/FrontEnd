import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'; // <-- Adiciona esta linha
import { InputPrimaryComponent } from '../../components/ui/input-primary/input-primary.component';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [InputPrimaryComponent, CommonModule], // <-- Adiciona o CommonModule aqui
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent {
  selectedTab: string = 'create';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
