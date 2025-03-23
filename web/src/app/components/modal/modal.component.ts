import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  modalCloseEvent = output<void>();
  @Input() showModal: boolean = false;
  name: string = '';

  closeModal() {
    this.showModal = false;
    this.modalCloseEvent.emit();
  }

  openModal() {
    this.showModal = true;
  }
}
