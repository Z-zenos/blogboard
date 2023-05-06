import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category.interface';
import { IImage } from 'src/app/models/image.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'board-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @ViewChild('inputFileImg', { static: false }) inputFileImg!: ElementRef;
  @ViewChild('btnFileImg', { static: false }) btnFileImg!: ElementRef;
  @ViewChild('dragArea', { static: false }) dropArea!: ElementRef<HTMLDivElement>;
  @ViewChild('dragText', { static: false }) dragText!: ElementRef;

  @Input() type: string = 'create';
  @Input() category: ICategory = { name: '', color: '#000000', logo: '' };

  file!: File | undefined;
  form!: FormGroup;

  @Output() closeFormEvent = new EventEmitter<boolean>();

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    console.log(this.category);

    // logo of image will be saved based 64
    this.form = this._fb.group({
      logo: [this.category?.logo ?? '', Validators.required],
      name: [this.category?.name ?? '', Validators.required],
      color: [this.category?.color ?? '#000000', Validators.required]
    });
  }

  get ctgrFormControl() {
    return this.form.controls;
  }

  async onSubmit() {
    try {
      if (!this.form.valid) {
        throw new Error("Please fill all field.");
      }

      if ((this.file?.size as number) > (1024 * 1024)) {
        throw new Error("File size greater than 2 MB");
      };

      if (this.type === 'create') {
        await this._categoryService.create(this.form.value);
        this._toastService.success("Successfully", `Welcome to category family: ${this.form.value.name}`);
      }
      else {
        await this._categoryService.update({ id: this.category.id, ...this.form.value });
        this._toastService.success("Successfully", `Updated: ${this.form.value.name}`);
      }
      this.onClose();
    }
    catch (e: any) {
      console.log(e);

      this._toastService.error("Failure", `Can't add new category. Message: ${e.message}`);
    }
    finally {
      this.type === 'create' && this.form.reset();
      this.file = undefined;
    }
  }

  onClose(): void {
    this.closeFormEvent.emit(false);
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
    console.log(image);

    this.category.logo = image.base64;
    this.form.patchValue({
      logo: image.base64
    });
  }
}
