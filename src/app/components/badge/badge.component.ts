import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'blog-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  @Input() title = "";
  @Input() src: string = '';
  @Input() color: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  getColor(title: string): string {
    return this.color ?? 'black';
  }

}
