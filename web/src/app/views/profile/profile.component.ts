import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footers/footer/footer.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [FooterComponent],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
