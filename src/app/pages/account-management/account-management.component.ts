import { Component } from '@angular/core';

// Remove duplicate import of CommonModule
import { InputPrimaryComponent } from '../../components/ui/input-primary/input-primary.component';
import { CommonModule } from '@angular/common'; // <-- Adiciona esta linha
import { BackButtonComponent } from '../../components/ui/back-button/back-button.component';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [InputPrimaryComponent, CommonModule, BackButtonComponent], // <-- Adiciona o CommonModule aqui
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent {
  selectedTab: string = 'create';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
