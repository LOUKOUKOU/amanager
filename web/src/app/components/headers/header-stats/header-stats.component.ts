import { Component, OnInit } from '@angular/core';
import { CardStatsComponent } from '../../cards/card-stats/card-stats.component';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  standalone: true,
  imports: [CardStatsComponent],
})
export class HeaderStatsComponent {
  constructor() {}
}
