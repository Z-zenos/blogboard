import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'board-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() image_url: string = "";
  @Input() title: string = "";
  @Input() excerpt: string = "";
  @Input() categories: { id: string, name: string }[] = [];
  @Input() view: number = 0;
  @Input() like: number = 0;
  @Input() published?: Date;

  isDisplayAction: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  displayAction() {
    this.isDisplayAction = true;
    console.log(this.isDisplayAction);
  }

  hideAction() {
    this.isDisplayAction = false;
    console.log(this.isDisplayAction);
  }

  editPost() {

  }

  removePost() {

  }
}
