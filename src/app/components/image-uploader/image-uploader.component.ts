import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IImage } from 'src/app/models/image.interface';

@Component({
  selector: 'board-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageUploaderComponent,
      multi: true
    }
  ]
})
export class ImageUploaderComponent implements ControlValueAccessor {
  @ViewChild('inputFileImg', { static: false }) inputFileImg!: ElementRef;
  @ViewChild('btnFileImg', { static: false }) btnFileImg!: ElementRef;
  @ViewChild('dragArea', { static: false }) dropArea!: ElementRef<HTMLDivElement>;
  @ViewChild('dragText', { static: false }) dragText!: ElementRef;

  @Input() style: { [klass: string]: any; } | null | undefined = {};
  @Input() imgUrl: string = '';

  @Output() changeImage = new EventEmitter<IImage>();

  file!: File | null;

  onChange = (value: any) => { };
  onTouched = () => { };

  browseFileImg() {
    this.inputFileImg.nativeElement.click();
  }

  onSelect(e: Event) {
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
    this.onChange(this.file);

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
        this.changeImage.emit({ file: this.file, src: this.imgUrl });
      }
      fileReader.readAsDataURL(this.file as File);
    }
    else {
      alert("This is not an image file !");
      this.dropArea.nativeElement.classList.remove("active");
      if (this.dragText) this.dragText.nativeElement.textContent = "Drag & Drop";
    }
  }

  writeValue(value: null) {
    // clear file input
    if (this.inputFileImg) this.inputFileImg.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

}
