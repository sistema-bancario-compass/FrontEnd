import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-back-button',
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
    constructor(private router: Router) {}
    goBack() {
        this.router.navigate(['/main-menu']);
      }

  @Input() label: string = 'Back to Menu';
}
