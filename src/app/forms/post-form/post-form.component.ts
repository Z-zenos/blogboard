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
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, false] }],
      ['code-block'], // code block
      [{ align: [] }],
      ['emoji'],
      ['clean'], // remove formatting button
      ['link', 'image', 'video']
    ],
    // blotFormatter: {}
  };

  form!: FormGroup;
  references: string[] = [];
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
      references: [[], Validators.required],
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

  stats: any = {};

  exportStats(): void {
    const temp = document.createElement('div');
    temp.innerHTML = this.form.value.content;

    this.stats.words = temp.innerText.trim().split(/\s+/).length;
    this.stats.images = temp.querySelectorAll('img').length;
    this.stats.links = temp.querySelectorAll('a').length;
    this.stats['reading-time'] = this.caculateTimeReading(temp.innerText.trim()) + ' min';

    this.stats.headingList = Array.from(document.querySelectorAll('.ql-editor h1, .ql-editor h2, .ql-editor h3'));

  }

  caculateTimeReading(content: string): number {
    const wpm = 225;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
  }

  getFieldsInStats(): string[] {
    return Object.keys(this.stats);
  }

  autoDetectLink(e: InputEvent) {
    if (!e.data?.trim()) return;

    if (!/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/.test(e.data.trim())) {
      return;
    }

    this.references = [...this.references, e.data.trim()];
    this.form.patchValue({
      references: this.references
    });

    (e.target as HTMLInputElement).value = '';
  }

  removeLink(index: number) {
    this.references.splice(index, 1);
  }
}
