import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-primary',
  imports: [],
  templateUrl: './input-primary.component.html',
  styleUrl: './input-primary.component.scss',
})
export class InputPrimaryComponent {
  @Input() label: string = 'Input Label';
  @Input() name: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'date' = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
}
