import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
})
export class FooterComponent {
  date = new Date().getFullYear();
  constructor() {}
}
