import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post.interface';
import { IPreview } from 'src/app/models/preview.interface';
import { CategoryService } from 'src/app/services/category.service';
import { PreviewService } from 'src/app/services/preview.service';

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
    private _categoryService: CategoryService
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

}
