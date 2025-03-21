import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-table-dropdown',
  templateUrl: './table-dropdown.component.html',
})
export class TableDropdownComponent {
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
