import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'board-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isDisplayForm: boolean = true;

  constructor(private _overlayService: OverlayService) { }

  ngOnInit(): void {
  }

  openForm() {
    this.isDisplayForm = true;
    this._overlayService.control(true);
  }

  closeForm(isClose: boolean) {
    this.isDisplayForm = isClose;
    this._overlayService.control(false);
  }

}
