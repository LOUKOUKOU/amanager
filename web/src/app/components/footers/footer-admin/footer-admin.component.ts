import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  standalone: true,
})
export class FooterAdminComponent {
  date = new Date().getFullYear();
  constructor() {}
}
