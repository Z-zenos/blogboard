import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
  isDropdown: boolean = false;
  pages: number = 0;

  constructor(
    private _postService: PostService,
    private _loaderService: LoaderService
  ) { }

  async ngOnInit() {
    await this.loadAllPost();
  }

  async loadAllPost() {
    this._loaderService.control(true);
    this.posts = await firstValueFrom(await this._postService.getAll());
    this.pages = Math.ceil(await this._postService.totalPosts() / 7);
    console.log(this.pages);

    this._loaderService.control(false);
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

  async sortPost(e: Event) {
    try {
      const liEl = (e.target as HTMLElement);
      this._loaderService.control(true);
      this.posts = await firstValueFrom(await this._postService.getAll({ orderBy: liEl.dataset['typesort'] }));
      console.log(this.posts);
      this.isDropdown = false;
    }
    catch (err) {

    }
    finally {
      this._loaderService.control(false);
    }
  }

  async paginate() {
    this.posts = await firstValueFrom(await this._postService.getAll({ paginate: true }));

  }
}
