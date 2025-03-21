import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationDropdownComponent } from '../dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from '../dropdowns/user-dropdown/user-dropdown.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NotificationDropdownComponent,
    UserDropdownComponent,
    RouterLinkActive,
  ],
})
export class SidebarComponent {
  collapseShow = 'hidden';
  constructor() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
}
