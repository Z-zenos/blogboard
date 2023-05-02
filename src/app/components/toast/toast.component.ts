import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IToast } from 'src/app/models/toast.interface';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'board-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @ViewChild('toastEl', { static: false }) toastEl?: ElementRef;

  toast?: IToast;

  constructor(private _toastService: ToastService) { }

  ngOnInit(): void {
    this._toastService.displayToast$.subscribe((toast: IToast) => {
      this.toast = toast;
      setTimeout(() => {
        this.toastEl?.nativeElement.classList.remove('active', `toast--${toast.type}`);
      }, 5000);
    });
  }
}
