import { Component, OnInit } from '@angular/core';
import { CardProfileComponent } from '@/components/cards/card-profile/card-profile.component';
import { CardSettingsComponent } from '@/components/cards/card-settings/card-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports: [CardSettingsComponent, CardProfileComponent],
  standalone: true,
})
export class SettingsComponent {
  constructor() {}
}
