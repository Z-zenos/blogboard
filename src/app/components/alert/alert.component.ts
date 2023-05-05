import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'board-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: string = 'error';

  constructor() { }

  ngOnInit(): void {
  }

}
