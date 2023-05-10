import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPost } from '../models/post.interface';
import { OverlayService } from './overlay.service';
import { IPreview } from '../models/preview.interface';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  private _preview = new BehaviorSubject<IPreview>({ isDisplay: false });

  readonly preview$ = this._preview.asObservable();

  constructor(private _overlayService: OverlayService) { }

  controlPreview(data: IPreview) {
    this._overlayService.control(data.isDisplay);
    this._preview.next(data);
  }
}
