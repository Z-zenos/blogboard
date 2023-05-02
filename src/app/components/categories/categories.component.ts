import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'board-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isDisplayForm: boolean = false;
  isDropDown: boolean = false;

  constructor(private _overlayService: OverlayService, private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getAll().subscribe(data => console.log(data));
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
