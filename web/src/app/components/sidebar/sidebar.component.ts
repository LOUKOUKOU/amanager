import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationDropdownComponent } from '../dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from '../dropdowns/user-dropdown/user-dropdown.component';
import { SessionService } from '@/services/SessionService';

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

  constructor(private sessionService: SessionService, private router: Router) {}

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  logout() {
    this.sessionService.clearSession();
    this.router.navigate(['/auth/login']);
  }
}
