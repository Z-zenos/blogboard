import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IPost } from 'src/app/models/post.interface';
import { IPreview } from 'src/app/models/preview.interface';
import { CategoryService } from 'src/app/services/category.service';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';
import { PreviewService } from 'src/app/services/preview.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'board-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  post?: IPost;
  isDisplay: boolean = false;
  readingTime: number = 0;
  headingList: Element[] = [];

  awards = ['clap', 'heart', 'star', 'light', 'money', 'rocket', 'gift', 'crown', 'trophy', 'sprout', 'time'];

  // headingList$?: Observable<HTMLHeadingElement[]>;

  constructor(
    private _previewService: PreviewService,
    private _categoryService: CategoryService,
    private _formService: FormService,
    private _loaderService: LoaderService,
    private _postService: PostService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this._previewService.preview$.subscribe((data: IPreview) => {
      this.isDisplay = data.isDisplay;
      if (this.isDisplay) {
        this.post = data.post;
        this.caculateTimeReading();
        this.headingList = Array.from(document.querySelectorAll('.ql-editor h1, .ql-editor h2, .ql-editor h3'));
      }
    });
  }

  ngAfterViewInit() {
    // this.headingList$ = this._contentService.headingList$;
    // this._cdref.detectChanges();

  }

  caculateTimeReading(): void {
    const text = this.post?.content;
    const wpm = 225;
    const words = text?.trim().split(/\s+/).length;
    const time = Math.ceil((words ?? 0) / wpm);
    this.readingTime = time;
  }

  toggleSrcImage(e: Event): void {
    const img = e.target as HTMLImageElement;
    const src = img.src;
    const index = src.lastIndexOf("/") + 1;
    const filenameWithExt = src.substring(index);
    const [filename, ext] = filenameWithExt.split('.');

    let newFileName;
    newFileName = filename.slice(-2) === 'ed' ? filename.slice(0, -2) : filename + "ed";
    img.src = `http://localhost:4200/assets/icons/${newFileName}.${ext}`;
  }

  close() {
    this._previewService.controlPreview({ isDisplay: false });
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
      this.post = await firstValueFrom(this._postService.getPostById(this.post?.id as string));

      this._toastService.success("Successfully", `${this.post?.title} was ${mark ? 'marked as featured' : 'unmarked'}`);
    }
    catch (err: any) {
      this._toastService.success("Failure", `Something went wrong. Message: ${err.message}`);
    }
    finally {
      this._loaderService.control(false);
    }
  }
}
