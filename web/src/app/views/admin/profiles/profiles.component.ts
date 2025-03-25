import { ModalComponent } from '@/components/modal/modal.component';
import { NotusTableComponent } from '@/components/table/notus-table.component';
import { Component } from '@angular/core';
import { baseAdmin } from '../base-admin';
import { FormComponent } from '@/components/form/form.component';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [NotusTableComponent, ModalComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css',
})
export class ProfilesComponent extends baseAdmin {
  constructor() {
    super();
  }
}
