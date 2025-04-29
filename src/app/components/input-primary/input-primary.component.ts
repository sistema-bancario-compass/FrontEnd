import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-select',
  imports: [],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
})
export class InputPrimaryComponent {
  @Input() label: string = 'Input Label';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
}
