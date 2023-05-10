import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post.interface';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';
import { PreviewService } from 'src/app/services/preview.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'board-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post!: IPost;

  isDisplayAction: boolean = false;

  constructor(
    private _formService: FormService,
    private _postService: PostService,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    private _previewService: PreviewService
  ) { }

  ngOnInit(): void {
  }

  deletePost() {
    this._formService.controlForm(
      'destroy',
      { isDisplay: true, service: 'post', title: 'Post', destroyData: { value: this.post?.title, id: this.post?.id } }
    );
  }

  async markFeatured(mark: boolean) {
    try {
      this._loaderService.control(true);
      await this._postService.maskFeatured(this.post?.id, mark);
      this._toastService.success("Successfully", `${this.post?.title} was ${mark ? 'marked as featured' : 'unmarked'}`);
    }
    catch (err: any) {
      this._toastService.success("Failure", `Something went wrong. Message: ${err.message}`);
    }
    finally {
      this._loaderService.control(false);
    }
  }

  preview() {
    this._previewService.controlPreview({ isDisplay: true, post: this.post });
  }
}
