import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-index-dropdown',
  templateUrl: './index-dropdown.component.html',
  providers: [RouterLink],
  imports: [RouterLink],
  standalone: true,
})
export class IndexDropdownComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef:
    | ElementRef
    | undefined;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef: ElementRef | undefined;
  ngOnInit() {}
  toggleDropdown(event: Event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }
  createPoppper() {
    createPopper(
      this.btnDropdownRef?.nativeElement,
      this.popoverDropdownRef?.nativeElement,
      {
        placement: 'bottom-start',
      }
    );
  }
}
