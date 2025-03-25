import { Component, OnInit } from '@angular/core';
import {
  NotusTableComponent,
  TableCell,
  TableConfig,
} from '@/components/table/notus-table.component';
import { ProjectService } from '@/services/ProjectService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [NotusTableComponent],
  standalone: true,
})
export class DashboardComponent {
  constructor(protected projectService: ProjectService) {
    projectService.initialiseData();
  }
}
