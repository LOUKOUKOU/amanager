import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  standalone: true,
})
export class NotificationDropdownComponent {
  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef:
    | ElementRef
    | undefined;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef: ElementRef | undefined;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef?.nativeElement,
      this.popoverDropdownRef?.nativeElement,
      {
        placement: 'bottom-start',
      }
    );
  }
  toggleDropdown(event: Event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
}
