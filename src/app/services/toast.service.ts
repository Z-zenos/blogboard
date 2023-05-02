import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToast } from '../models/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _displayToast = new BehaviorSubject<IToast>({});
  readonly displayToast$ = this._displayToast.asObservable();

  constructor() { }

  invoke(type: string, title: string, content?: string) {
    this._displayToast.next({
      type, title, content
    })
  }

  success(title: string, content?: string) { this.invoke('success', title, content); }
  error(title: string, content?: string) { this.invoke('error', title, content); }
  warning(title: string, content?: string) { this.invoke('warning', title, content); }
  info(title: string, content?: string) { this.invoke('info', title, content); }
  special(title: string, content?: string) { this.invoke('special', title, content); }
}
