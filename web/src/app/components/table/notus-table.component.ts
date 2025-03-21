import { Component, Input, OnInit } from '@angular/core';

export interface TableCell {
  content: string;
  key: string;
}

export interface TableConfig {
  headerConfig: TableCell[];
}

@Component({
  selector: 'app-notus-table',
  templateUrl: './notus-table.component.html',
  standalone: true,
})
export class NotusTableComponent {
  @Input() tableConfig: TableConfig = {
    headerConfig: [],
  };
  @Input() data: TableCell[][] = [];
  constructor() {}
}
