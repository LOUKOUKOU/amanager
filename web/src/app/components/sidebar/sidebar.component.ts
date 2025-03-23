import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationDropdownComponent } from '../dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from '../dropdowns/user-dropdown/user-dropdown.component';
import { LoginService } from '@/services/LoginService';

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
  providers: [LoginService],
})
export class SidebarComponent {
  collapseShow = 'hidden';

  constructor(private loginService: LoginService, private router: Router) {}

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }
}
