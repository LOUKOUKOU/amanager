import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AdminNavbarComponent } from '../../components/navbars/admin-navbar/admin-navbar.component';
import { HeaderStatsComponent } from '../../components/headers/header-stats/header-stats.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterAdminComponent } from '../../components/footers/footer-admin/footer-admin.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [
    SidebarComponent,
    AdminNavbarComponent,
    HeaderStatsComponent,
    FooterAdminComponent,
    RouterOutlet,
    RouterLink,
  ],
  standalone: true,
})
export class AdminComponent {
  constructor() {}
}
