import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IToast } from 'src/app/models/toast.interface';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'board-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @ViewChild('toastEl', { static: false }) toastEl?: ElementRef;
  // private unsubscribe$: Subject<IToast> = new Subject<IToast>();

  toast?: IToast;

  constructor(private _toastService: ToastService) { }

  ngOnInit(): void {
    this._toastService.displayToast$
      .subscribe((toast: IToast) => {
        this.toast = toast;
        this.toastEl?.nativeElement.classList.add('active', `toast--${toast.type}`);
        console.log(this.toast);

        setTimeout(() => {
          this.toastEl?.nativeElement.classList.remove('active', `toast--${toast.type}`);
        }, 5100);
      });
  }

  onClose() {
    this.toastEl?.nativeElement.classList.remove('active', `toast--${this.toast?.type}`);
  }

  // @HostListener('window:beforeunload', ['$event'])
  // async ngOnDestroy() {
  //   console.log('destroy');

  //   if (this.toast) {
  //     this.unsubscribe$.next({});
  //     this.unsubscribe$.complete();
  //   }
  // }
}
