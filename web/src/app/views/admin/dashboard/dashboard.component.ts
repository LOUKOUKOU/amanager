import { Component, OnInit } from '@angular/core';
import {
  NotusTableComponent,
  TableCell,
} from '@common/components/table/notus-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [NotusTableComponent],
  standalone: true,
})
export class DashboardComponent {
  projects: TableCell[][] = [
    [
      { content: 'Big Project 1', key: 'name' },
      { content: '4569', key: 'tasks' },
      { content: '340', key: 'developers' },
      { content: '5 April 2025', key: 'dueDate' },
      { content: '60', key: 'progress' },
    ],
    [
      { content: 'Big Project 1', key: 'name' },
      { content: '4569', key: 'tasks' },
      { content: '340', key: 'developers' },
      { content: '5 April 2025', key: 'dueDate' },
      { content: '60', key: 'progress' },
    ],
    [
      { content: 'Big Project 1', key: 'name' },
      { content: '4569', key: 'tasks' },
      { content: '340', key: 'developers' },
      { content: '5 April 2025', key: 'dueDate' },
      { content: '60', key: 'progress' },
    ],
    [
      { content: 'Big Project 1', key: 'name' },
      { content: '4569', key: 'tasks' },
      { content: '340', key: 'developers' },
      { content: '5 April 2025', key: 'dueDate' },
      { content: '60', key: 'progress' },
    ],
    [
      { content: 'Big Project 1', key: 'name' },
      { content: '4569', key: 'tasks' },
      { content: '340', key: 'developers' },
      { content: '5 April 2025', key: 'dueDate' },
      { content: '60', key: 'progress' },
    ],
  ];
  constructor() {}
}
