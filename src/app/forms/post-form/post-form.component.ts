import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'board-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  form!: FormGroup;

  constructor(private _fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this._fb.group({
      title: ['', Validators.required],
      permalink: ['', Validators.required],
      excerpt: ['', Validators.required],
      categories: ['', Validators.required],
      image: ['', Validators.required],
      content: ['Test content', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onImageChange(src: string) {
    // this.form.patchValue({
    //   image: src
    // });
  }
}
