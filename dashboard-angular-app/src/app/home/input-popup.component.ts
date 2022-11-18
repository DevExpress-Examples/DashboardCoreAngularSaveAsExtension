import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-popup',
  templateUrl: './input-popup.component.html',
})

export class InputPopupComponent {
  @Input() message: string;
  @Input() inputText: string;
  @Input() popupVisible: boolean;

  @Output() applyInput: EventEmitter<any> = new EventEmitter();
  @Output() cancelInput: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.saveButtonAction = this.saveButtonAction.bind(this);
    this.cancelButtonAction = this.cancelButtonAction.bind(this);
  }

  saveButtonAction() {
    this.popupVisible = false;
    this.applyInput.emit(this.inputText);
  }
  cancelButtonAction() {
    this.popupVisible = false;
    this.cancelInput.emit();
  }
}
