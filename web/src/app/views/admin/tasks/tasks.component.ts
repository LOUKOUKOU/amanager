import { ModalComponent } from '@/components/modal/modal.component';
import { NotusTableComponent } from '@/components/table/notus-table.component';
import { Component } from '@angular/core';
import { baseAdmin } from '../base-admin';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NotusTableComponent, ModalComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent extends baseAdmin {
  constructor() {
    super();
  }
  // ,
  //     {
  //       key: 'status',
  //       label: 'Status',
  //       type: 'select',
  //       required: true,
  //       options: ['Active', 'Inactive'],
  //       placeholder: 'Status',
  //       errorMessage: 'Status is required',
  //     },
}
