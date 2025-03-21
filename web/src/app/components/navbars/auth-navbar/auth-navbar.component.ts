import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PagesDropdownComponent } from '../../dropdowns/pages-dropdown/pages-dropdown.component';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  standalone: true,
  imports: [RouterLink, PagesDropdownComponent],
})
export class AuthNavbarComponent {
  navbarOpen = false;
  constructor() {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
