import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'board-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {
  @Input() tipList: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
