import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div class="flex items-center">
      <span class="mr-2">{{ value }}%</span>
      <div class="relative w-full">
        <div
          class="overflow-hidden h-2 text-xs flex rounded"
          [class]="
            backgroundClass ? backgroundClass : getBarColor(value, '200')
          "
        >
          <div
            [style]="{ width: value + '%' }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
            [class]="innerClass ? innerClass : getBarColor(value, '500')"
          ></div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
})
export class ProgressBarComponent {
  @Input() value: number | string = 0;
  @Input() backgroundClass: string = '';
  @Input() innerClass: string = '';
  constructor() {}

  getBarColor(value: number | string, appendValue: string) {
    const parsedValue = parseInt(value + '');
    if (parsedValue < 25) {
      return 'bg-red-' + appendValue;
    } else if (parsedValue < 50) {
      return 'bg-orange-' + appendValue;
    } else if (parsedValue < 75) {
      return 'bg-emerald-' + appendValue;
    } else {
      return 'bg-lightBlue-' + appendValue;
    }
  }
}
