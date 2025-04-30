import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() size: 'large' | 'small' = 'large';
  @Input() color: 'black' | 'red' | "gray" = 'black';
  @Input() label: string = 'Submit';
  @Input() type: 'button' | 'submit' = 'button';
}
