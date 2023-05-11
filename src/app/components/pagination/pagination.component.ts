import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'board-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, AfterViewInit {

  @Input() totalPages!: number;
  @Output() onPage: EventEmitter<string> = new EventEmitter<string>();

  pageArr: number[] = [];
  currentPage: number = 1;
  maxPage: number = 7;
  listPage: HTMLElement[] = [];

  constructor(private _elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.maxPage = this.totalPages > this.maxPage ? this.maxPage : this.totalPages;
    this.pageArr = Array.from({ length: this.maxPage }, (_, i) => i + 1);
  }

  ngAfterViewInit() {
    this.listPage = Array.from(this._elRef.nativeElement.querySelectorAll('li'));
  }

  changePage(e: Event) {
    const liEl = (e.target as HTMLElement);
    if (liEl.nodeName === 'LI' && !liEl.classList.contains('active')) {
      if (liEl.textContent === '→') {
        this.currentPage++;
        this.onPage.emit("next");
      }
      else if (liEl.textContent === '←') {
        this.currentPage--;
        this.onPage.emit("prev");
      }
      else {
        // @ts-ignore
        this.currentPage = +liEl.textContent;
      }

      let minPage = 1;
      if (this.totalPages > 7) {
        if (this.currentPage > this.totalPages - 3) {
          minPage = this.totalPages - 6;
        }
        else if (this.currentPage > Math.ceil(this.maxPage / 2)) {
          minPage = this.currentPage - 3;
        }
      }

      this.pageArr = Array.from({ length: this.maxPage }, (_, i) => i + minPage);
      this.listPage = Array.from(this._elRef.nativeElement.querySelectorAll('li'));

      this.listPage.forEach((p: any) => {
        p.classList.remove('active');
        if (p.textContent == this.currentPage) p.classList.add('active');
      });

    }
  }

}
