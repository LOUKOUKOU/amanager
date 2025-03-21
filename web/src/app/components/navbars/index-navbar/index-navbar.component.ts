import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IndexDropdownComponent } from '../../dropdowns/index-dropdown/index-dropdown.component';

@Component({
  selector: 'app-index-navbar',
  templateUrl: './index-navbar.component.html',
  standalone: true,
  imports: [RouterLink, IndexDropdownComponent],
})
export class IndexNavbarComponent {
  navbarOpen = false;

  constructor() {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
