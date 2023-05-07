import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post.interface';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'board-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post?: IPost;

  isDisplayAction: boolean = false;

  constructor(private _formService: FormService) { }

  ngOnInit(): void {
  }

  deletePost() {
    this._formService.controlForm(
      'destroy',
      { isDisplay: true, service: 'post', title: 'Post', destroyData: { value: this.post?.title, id: this.post?.id } }
    );
  }
}
