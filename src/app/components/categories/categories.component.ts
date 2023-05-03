import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'board-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isDisplayCtgrForm: boolean = false;
  isDisplayDestroyForm: boolean = false;
  valueWillBeDestroyed: string = '';
  selectedCategory: ICategory = { name: '', logo: '', color: '#000000' };
  isDropDown: boolean = false;
  categories: ICategory[] = [];

  constructor(private _overlayService: OverlayService, private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getAll().subscribe((data: ICategory[]) => {
      this.categories = data;
    });
  }

  openForm(type: string, value?: any) {
    switch (type) {
      case 'ctgr':
        this.isDisplayCtgrForm = true;
        if (value?.name) this.selectedCategory = { ...value };
        break;

      case 'destroy':
        this.isDisplayDestroyForm = true;
        this.valueWillBeDestroyed = value.name;
        break;
    }
    this._overlayService.control(true);
  }

  closeForm(isClose: boolean, type: string) {
    switch (type) {
      case 'ctgr':
        this.isDisplayCtgrForm = isClose;
        break;

      case 'destroy':
        this.isDisplayDestroyForm = isClose;
        break;
    }

    this.selectedCategory = { name: '', logo: '', color: '#000000' };
    this._overlayService.control(false);
  }

  copyColor(e: Event) {
    let colorEl = (e.target as HTMLSpanElement);
    let hex = colorEl.textContent;
    colorEl.textContent = "Copied!";
    setTimeout(() => colorEl.textContent = hex, 2000);
  }

  padZero(str: string, len?: number) {
    len = len || 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  invertColor(hex: string, bw: boolean) {
    if (hex === 'white') hex = '#ffffff';
    else if (hex === 'black') hex = '#000000';

    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r: string | number = parseInt(hex.slice(0, 2), 16),
      g: string | number = parseInt(hex.slice(2, 4), 16),
      b: string | number = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // https://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

}
