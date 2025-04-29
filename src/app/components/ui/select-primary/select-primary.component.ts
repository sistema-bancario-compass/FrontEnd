import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-primary',
  imports: [],
  templateUrl: './select-primary.component.html',
  styleUrl: './select-primary.component.scss'
})
export class SelectPrimaryComponent {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  onChange(value: any) {
    this.valueChange.emit(value);
  }
}
