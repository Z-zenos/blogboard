import { Component, Input, OnInit } from '@angular/core';

const collections = [
  { title: 'nodejs', color: '#83cd29' },
  { title: 'c', color: '#03599c' },
  { title: 'html5', color: '#f16529' },
  { title: 'css', color: '#33a9dc' },
  { title: 'javascript', color: '#f0db4f' },
  { title: 'mongodb', color: '#439934' },
  { title: 'mysql', color: '#106a91' },
]

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
