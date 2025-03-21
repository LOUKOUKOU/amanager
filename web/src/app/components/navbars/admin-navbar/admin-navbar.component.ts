import { Component, OnInit } from '@angular/core';
import { UserDropdownComponent } from '../../dropdowns/user-dropdown/user-dropdown.component';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  standalone: true,
  imports: [UserDropdownComponent],
})
export class AdminNavbarComponent {
  constructor() {}
}
