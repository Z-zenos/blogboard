import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPost } from '../models/post.interface';
import { OverlayService } from './overlay.service';
import { IPreview } from '../models/preview.interface';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  private _preview = new BehaviorSubject<IPreview>({
    isDisplay: false,
    post: {
      title: '',
      permalink: '',
      content: '',
      references: [],
      categories: [],
      image: '',
      excerpt: '',
      comment_id: '',

      view: 0,
      like: 0,
      isFeatured: false,

      created_at: Date.now(),
    }
  });

  readonly preview$ = this._preview.asObservable();

  constructor(private _overlayService: OverlayService) { }

  controlPreview(data: IPreview) {
    this._overlayService.control(data.isDisplay);
    this._preview.next(data);
  }
}
