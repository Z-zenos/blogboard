import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post.interface';

@Component({
  selector: 'board-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post?: IPost;

  isDisplayAction: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  removePost() {

  }
}
