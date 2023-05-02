import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'blog-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tagName = "";
  bgColor: string = "white";
  private _color: string = 'black';

  constructor() { }

  ngOnInit(): void { }

  @Input() set color(value: string) {
    this._color = value;
  }

  get color(): string {
    return this._color;
  }

  hover(e: Event, enter: boolean = true) {
    const tagEl = e.target as HTMLElement;
    if (this.color !== "white") {
      tagEl.style.backgroundColor = enter ? "white" : this.color;
      tagEl.style.color = enter ? this.color : "white";
      this.bgColor = this.color;
    }
    else {
      this.bgColor = "black";
      tagEl.style.backgroundColor = enter ? this.color : this.bgColor;
      tagEl.style.color = enter ? this.bgColor : this.color;
    }
  }
}
