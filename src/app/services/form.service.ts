import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDestroyForm } from '../models/destroy-form.interface';
import { ICategoryForm } from '../models/catefory-form.interface';
import { OverlayService } from './overlay.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _categoryForm = new BehaviorSubject<ICategoryForm>({ isDisplay: false });
  readonly categoryForm$ = this._categoryForm.asObservable();

  private _destroyForm = new BehaviorSubject<IDestroyForm>({ isDisplay: false });
  readonly destroyForm$ = this._destroyForm.asObservable();

  constructor(private _overlayService: OverlayService) { }

  controlForm(type: string, data: any) {
    this._overlayService.control(data.isDisplay);
    if (type === 'category') this._categoryForm.next(data);
    else if (type === 'destroy') this._destroyForm.next(data);
  }
}
