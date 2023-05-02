import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  file!: File | undefined;
  imgUrl: string = '';
  color: string = '';
  form!: FormGroup;

  @Output() closeFormEvent = new EventEmitter<boolean>();

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    // logo of image will be saved based 64
    this.form = this._fb.group({
      logo: ['', Validators.required],
      name: ['', Validators.required],
      color: ['white', Validators.required]
    });
  }

  async onSubmit() {
    this.form.value.logo = this.imgUrl ?? this.file?.name;
    if (!(this.form.value.logo && this.form.value.name && this.form.value.color)) return;

    try {
      await this._categoryService.create(this.form.value);
      this._toastService.success("Successfully", `Welcome to category family: ${this.form.value.name}`);
    }
    catch (e: any) {
      this._toastService.error("Failure", `Can't add new category. ${e.message}`);
    }
    finally {
      this.form.reset();
      this.file = undefined;
      this.color = '';
      this.onClose();
    }
  }

  onClose(): void {
    this.closeFormEvent.emit(false);
  }

  pickColor(e: InputEvent) {
    this.color = (e.target as HTMLInputElement).value;
  }

  browseFileImg() {
    this.inputFileImg.nativeElement.click();
  }

  onChange(e: Event) {
    // Getting user select file and [0] this means if user select multiple files then we'll select only the first one
    // @ts-ignore
    this.file = (e.target as HTMLInputElement).files[0];
    this.dropArea.nativeElement.classList.add('active');
    this.showFile();
  }

  // If user drag file over drop area
  onDragOver(e: Event) {
    e.preventDefault();
    this.dropArea.nativeElement.classList.add('active');
    if (this.dragText) this.dragText.nativeElement.textContent = 'Release';
  }

  // If user leave dragged file from droparea
  onDragLeave() {
    this.dropArea.nativeElement.classList.remove("active");
    if (this.dragText) this.dragText.nativeElement.textContent = "Drag & Drop";
  }

  // If user drop file on drop area
  onDrop(e: Event) {
    e.preventDefault();

    // Getting user select file and [0] means if user select multiple files then we'll  select only the first one.
    // @ts-ignore
    this.file = e.dataTransfer.files[0];
    this.showFile();
  }

  showFile() {
    // Getting selected file type
    let fileType = this.file?.type;

    // adding some valid image extensions in array
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    // If user selected file is an image file
    if (validExtensions.includes(fileType ?? '')) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        // Passing user file source in fileURL variable
        let fileURL = fileReader.result;
        this.imgUrl = fileURL as string;
      }
      fileReader.readAsDataURL(this.file as File);
    }
    else {
      alert("This is not an image file !");
      this.dropArea.nativeElement.classList.remove("active");
      this.dragText.nativeElement.textContent = "Drag & Drop";
    }
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
}
