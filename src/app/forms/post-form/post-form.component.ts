import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import Emoji from 'quill-emoji'; -> Error, use below line
// import "quill-emoji/dist/quill-emoji.css"; -> Error
import 'quill-emoji/dist/quill-emoji.js';

import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'board-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})

export class PostFormComponent implements OnInit {

  config = {
    'emoji-toolbar': true,
    'emoji-shortname': true,
    syntax: true,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      // [{header: 1}, {header: 2}], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      // [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['code-block'], // code block
      [{ align: [] }],
      ['emoji'],
      ['clean'], // remove formatting button
      ['link', 'image', 'video']
    ],
    blotFormatter: {}
  };

  form!: FormGroup;

  quillEditorModules = {};

  constructor(private _fb: FormBuilder) {
    this.quillEditorModules = {
      ...this.config
    }
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
