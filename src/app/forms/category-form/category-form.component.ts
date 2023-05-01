import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  file!: File;
  form!: FormGroup;

  @Output() closeFormEvent = new EventEmitter<boolean>();

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      logo: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.form.value);

    // Clear input
    this.form.reset();
  }

  onClose(): void {
    this.closeFormEvent.emit(false);
  }

  browseFileImg() {
    this.inputFileImg.nativeElement.click();
  }

  onChange(e: Event) {
    // Getting user select file and [0] this means if user select multiple files then we'll select only the first one
    // @ts-ignore
    this.file = (e.target as HTMLInputElement).files[0];
    console.log(this.file);
    this.dropArea.nativeElement.classList.add('active');
    this.showFile();
  }

  // If user drag file over drop area
  onDragOver(e: Event) {
    e.preventDefault();
    this.dropArea.nativeElement.classList.add('active');
    this.dragText.nativeElement.textContent = 'Release';
  }

  // If user leave dragged file from droparea
  onDragLeave() {
    this.dropArea.nativeElement.classList.remove("active");
    this.dragText.nativeElement.textContent = "Drag & Drop";
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
    let fileType = this.file.type;

    // adding some valid image extensions in array
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    // If user selected file is an image file
    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        // Passing user file source in fileURL variable
        let fileURL = fileReader.result;

        // Creating an img tag and passing user selected file source inside src attr
        let imgTag = `<img class="ctgr-logo" src="${fileURL}" alt="image" style="height: 90%; width: 90%; border-radius: 6px; object-fit: cover; border-radius: 5px;">`;

        // Adding that created img tag inside dropArea container
        this.dropArea.nativeElement.innerHTML = imgTag;
      }
      fileReader.readAsDataURL(this.file);
    }
    else {
      alert("This is not an image file !");
      this.dropArea.nativeElement.classList.remove("active");
      this.dragText.nativeElement.textContent = "Drag & Drop";
    }
  }
}
