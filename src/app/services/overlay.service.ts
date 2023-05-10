import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private _overlay = new BehaviorSubject<boolean>(false);
  readonly overlay$ = this._overlay.asObservable();

  overlay: boolean = false;

  constructor() { }

  control(on: boolean) {
    this.overlay = on;
    this._overlay.next(this.overlay);
  }
}
