import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-table-supervisors",
  templateUrl: "./card-table-supervisors.component.html",
})
export class CardTableSupervisorsComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor() {}

  ngOnInit(): void {}
}
