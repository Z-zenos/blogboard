import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post.interface';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'board-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: IPost[] = [];

  constructor(
    private _postService: PostService,
    private _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loadAllPost();
  }

  loadAllPost() {
    this._loaderService.control(true);
    this._postService.getAll().subscribe(data => {
      this.posts = data;
      this._loaderService.control(false);
    });
  }

  searchPost(title: string) {
    this._loaderService.control(true);
    this._postService.getPostByTitle(title).subscribe((data: IPost[]) => {
      this.posts = data;
      this._loaderService.control(false);
    });
  }

  reset() {
    this.loadAllPost();
  }
}
