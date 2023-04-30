import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'board-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() name: string = '';
  @Input() extra: string = 'png';
  @Input() size: string = 'small';

  constructor() { }

  ngOnInit(): void {
  }

}