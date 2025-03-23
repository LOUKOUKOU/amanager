import { Component, OnInit } from '@angular/core';
import {
  NotusTableComponent,
  TableCell,
  TableConfig,
} from '@/components/table/notus-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [NotusTableComponent],
  standalone: true,
})
export class DashboardComponent {
  projectTableConfig: TableConfig = {
    headerConfig: [
      { key: 'name', title: 'Project Name' },
      { key: 'tasks', title: 'Number of tasks' },
      { key: 'developers', title: 'Number of developers' },
      { key: 'dueDate', title: 'Due date' },
      { key: 'progress', title: 'Project progress', type: 'progress-bar' },
    ],
  };

  projects: Array<Record<string, TableCell>> = [
    {
      name: { content: 'Big Project 1' },
      tasks: { content: '4569' },
      developers: { content: '340' },
      dueDate: {
        content: '5 April 2025',
        // iconPrefix: 'fas fa-arrow-up text-emerald-500',
      },
      progress: { content: '15' },
    },
    {
      name: { content: 'Big Project 1' },
      tasks: { content: '4569' },
      developers: { content: '340' },
      dueDate: { content: '5 April 2025' },
      progress: { content: '30' },
    },
    {
      name: { content: 'Big Project 1' },
      tasks: { content: '4569' },
      developers: { content: '340' },
      dueDate: { content: '5 April 2025' },
      progress: { content: '60' },
    },
    {
      name: { content: 'Big Project 1' },
      tasks: { content: '4569' },
      developers: { content: '340' },
      dueDate: { content: '5 April 2025' },
      progress: { content: '80' },
    },
    {
      name: { content: 'Big Project 1' },
      tasks: { content: '4569' },
      developers: { content: '340' },
      dueDate: { content: '5 April 2025' },
      progress: { content: '60' },
    },
  ];
  constructor() {}
}
