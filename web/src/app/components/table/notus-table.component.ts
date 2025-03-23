import { Component, Input, OnInit, output } from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';
import { Router, RouterLink } from '@angular/router';

export interface TableCell {
  content: string;
  icon?: string;
  link?: string;
  iconPrefix?: string;
}

export interface ColumnConfig {
  title: string;
  key: string;
  type?: string;
}

export interface TableConfig {
  headerConfig: ColumnConfig[];
}

@Component({
  selector: 'app-notus-table',
  templateUrl: './notus-table.component.html',
  standalone: true,
  providers: [Router],
  imports: [ProgressBarComponent, RouterLink],
})
export class NotusTableComponent {
  tableButtonClick = output<void>();
  @Input() link: string = '';
  @Input() button: string = '';
  @Input() tableConfig: TableConfig = {
    headerConfig: [],
  };
  @Input() data: Array<Record<string, TableCell>> = [];

  constructor(private router: Router) {}

  clickCellEvent(link?: string) {
    if (link) {
      this.router.navigate([link]);
    }
  }

  buttonClickEvent() {
    this.tableButtonClick.emit();
  }
}
