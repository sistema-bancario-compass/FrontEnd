import { Component } from '@angular/core';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { CommonModule } from '@angular/common'; // <-- Adiciona esta linha

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
