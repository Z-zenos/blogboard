import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loader = new BehaviorSubject<boolean>(false);
  readonly loader$ = this._loader.asObservable();

  constructor() { }

  control(on: boolean) {
    this._loader.next(on);
  }
}
