import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryForm } from 'src/app/models/catefory-form.interface';
import { ICategory } from 'src/app/models/category.interface';
import { IImage } from 'src/app/models/image.interface';
import { CategoryService } from 'src/app/services/category.service';
import { FormService } from 'src/app/services/form.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'board-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  type: string = 'create';
  category: ICategory = { name: '', color: '#000000', logo: '' };
  isDisplay: boolean = false;

  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _toastService: ToastService,
    private _formService: FormService
  ) { }

  ngOnInit(): void {
    this._formService.categoryForm$.subscribe((data: ICategoryForm) => {
      console.log(data);

      this.isDisplay = data.isDisplay;

      if (this.isDisplay) {
        this.type = data.type ?? 'create';
        this.category = data.category ?? { name: '', color: '#000000', logo: '' };
      }

      // logo of image will be saved based 64
      this.form = this._fb.group({
        logo: [this.category?.logo, Validators.required],
        name: [this.category?.name, Validators.required],
        color: [this.category?.color, Validators.required]
      });
    });
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async onSubmit() {
    try {
      if (!this.form.valid) {
        throw new Error("Please fill all field.");
      }

      if (this.type === 'create') {
        await this._categoryService.create(this.form.value);
        this._toastService.success("Successfully", `Welcome to category family: ${this.form.value.name}`);
      }
      else if (this.type === 'update') {
        await this._categoryService.update({ id: this.category.id, ...this.form.value });
        this._toastService.success("Successfully", `Updated: ${this.form.value.name}`);
      }
      this.onClose();
    }
    catch (e: any) {
      this._toastService.error("Failure", `Can't add new category. Message: ${e.message}`);
    }
    finally {
      this.type === 'create' && this.form.reset();
    }
  }

  onClose(): void {
    this._formService.controlForm('category', { isDisplay: false });
  }

  pickColor(e: InputEvent) {
    this.category.color = (e.target as HTMLInputElement).value;
  }

  byteConverter(bytes: number, decimals: number, only?: string) {
    const K_UNIT = 1024;
    const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

    if (bytes == 0) return "0 Byte";

    if (only === "MB") return (bytes / (K_UNIT * K_UNIT)).toFixed(decimals) + " MB";

    let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
    let resp = parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i];

    return resp;
  }

  retrieveImageSrc(image: IImage) {
    this.category.logo = image.src;
    this.form.patchValue({
      logo: image.src
    });
  }
}
