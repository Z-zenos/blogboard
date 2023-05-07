import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'board-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  selectedCategory: ICategory = { name: '', logo: '', color: '#000000' };
  isDropDown: boolean = false;
  categories: ICategory[] = [];
  ctgrType: string = 'create';

  constructor(
    private _categoryService: CategoryService,
    private _loaderService: LoaderService,
    private _formService: FormService
  ) { }

  ngOnInit(): void {
    this.retrieveAllCategories();
  }

  retrieveAllCategories() {
    this._loaderService.control(true);

    this._categoryService.getAll().subscribe((data: ICategory[]) => {
      this.categories = data;
      this._loaderService.control(false);
    });
  }

  openForm(type: string, value?: any) {
    this.selectedCategory = { ...value };

    switch (type) {
      case 'category':
        this.ctgrType = 'create';
        if (value?.name) {
          this.ctgrType = 'update';
        }
        this._formService.controlForm('category', { isDisplay: true, type: this.ctgrType, category: this.selectedCategory });

        break;

      case 'destroy':
        this._formService.controlForm('destroy', { isDisplay: true, service: 'category', title: 'Category', destroyData: this.selectedCategory });
        break;
    }
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
    if (hex === 'white' || !hex) hex = '#ffffff';
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

  searchCategory(name: string) {
    this._loaderService.control(true);

    this._categoryService.get(name).subscribe((data: ICategory[]) => {
      this.categories = data;
      this._loaderService.control(false);
    });
  }

  reset() {
    this.retrieveAllCategories();
  }

}
