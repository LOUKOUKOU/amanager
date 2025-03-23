import { ModalComponent } from '@/components/modal/modal.component';
import { NotusTableComponent } from '@/components/table/notus-table.component';
import { Component } from '@angular/core';
import { baseAdmin } from '../base-admin';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NotusTableComponent, ModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent extends baseAdmin {
  constructor() {
    super();
  }
}
