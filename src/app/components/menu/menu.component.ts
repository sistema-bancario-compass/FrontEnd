import { Component, Input, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from "../ui/button/button.component";

@Component({
  selector: 'app-menu',
  imports: [RouterModule, ButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(private router: Router) {}
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
