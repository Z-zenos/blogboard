import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

// import Emoji from 'quill-emoji'; -> Error, use below line
// import "quill-emoji/dist/quill-emoji.css"; -> Error
import 'quill-emoji/dist/quill-emoji.js';

import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/models/category.interface';
import { LoaderService } from 'src/app/services/loader.service';
import { ImageValidator } from 'src/app/validators/imageValidator';
import { IPost } from 'src/app/models/post.interface';
import { PostService } from 'src/app/services/post.service';
import { IImage } from 'src/app/models/image.interface';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { map, switchMap } from 'rxjs';

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
  selectedCategories: {}[] = [];
  categories: ICategory[] = [];
  quillEditorModules = {};
  selectedImage: IImage = { file: null, src: '' };
  type: string = 'publish';
  stats: any = {};
  editPost: IPost = {
    id: '',
    title: '',
    permalink: '',
    content: '',
    references: [],
    categories: [],
    image: '',
    excerpt: '',
    comment_id: '',
    view: 0,
    like: 0,
    isFeatured: false,
  };

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _loaderService: LoaderService,
    private _postService: PostService,
    private _toastService: ToastService,
    private _activatedRoute: ActivatedRoute,
    private _formService: FormService
  ) {
    this.quillEditorModules = {
      ...this.config
    }
  }

  ngOnInit(): void {
    this.retrieveAllCategories();

    this._activatedRoute.queryParams
      .pipe(
        switchMap(query => this._postService.getPostById(query['id']))
      )
      .subscribe((post: any) => {
        console.info("post: ", post);
        this.editPost = post ?? this.editPost;
        this.form = this._fb.group({
          title: [this.editPost?.title, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
          permalink: [this.editPost?.permalink, Validators.required],
          excerpt: [this.editPost?.excerpt, [Validators.required, Validators.minLength(50), Validators.maxLength(256)]],
          categories: [this.editPost?.categories, Validators.required],
          image: [this.editPost?.image, [ImageValidator.permitSize(5), ImageValidator.acceptExtenstions(['image/png', 'image/jpeg', 'image/jpg'])]],
          references: [this.editPost?.references],
          content: [this.editPost?.content, [Validators.required, Validators.minLength(50)]],
        });
        this.references = this.editPost.references;
        this.selectedImage = { file: null, src: this.editPost.image };
        if (post) this.type = 'update';
      });

  }

  get fc(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  retrieveAllCategories() {
    this._loaderService.control(true);
    this._categoryService.getAll().subscribe((data: ICategory[]) => {
      this.categories = data;
      this._loaderService.control(false);
    });
  }

  async onSubmit() {
    try {
      if (this.form.invalid) {
        throw new Error("Please fill all field.");
      }

      const extra = {
        speakable: false,
        comment_id: '',
        view: 0,
        awards: [],
        like: 0,
        isFeatured: false,
        status: '',
        created_at: Date.now(),
        updated_at: Date.now(),
        deleted: false,
      }

      const postData: IPost = Object.assign({}, this.editPost ?? extra, this.form.value);

      this._loaderService.control(true);
      await this._postService.publish(this.selectedImage, postData, this.type);
      this._toastService.success("Successfully", `Your post have been ${this.type === 'publish' ? 'published' : 'updated'}.`);
      this.reset();
    }
    catch (err: any) {
      this._toastService.error("Failure", `Something went wrong. Message: ${err.message}`);
    }
    finally {
      this._loaderService.control(false);
    }
  }

  onImageChange(image: IImage) {
    this.selectedImage = image;
    this.form.patchValue({
      image: image.src
    });
  }

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

  addCategory(category: { id: string, name: string }) {
    this.selectedCategories = [...this.selectedCategories, category];
    this.form.patchValue({
      categories: this.selectedCategories
    });
  }

  deleteCategory(data: any) {
    this.selectedCategories = !data ? [] : this.selectedCategories.filter((c: any) => c.id !== data.value.id);
    this.form.patchValue({
      categories: this.selectedCategories
    });
  }

  preview() {

  }

  onTitleChanged(e: InputEvent) {
    this.form.patchValue({
      permalink: (e.target as HTMLInputElement).value?.trim()?.replace(/\s+/g, '-')
    });
  }

  reset() {
    this.form.reset();
    this.selectedImage = { file: null, src: '' };
    this.references = [];
    this.deleteCategory(undefined);
    this.editPost = {
      id: '',
      title: '',
      permalink: '',
      content: '',
      references: [],
      categories: [],
      image: '',
      excerpt: '',
      comment_id: '',
      view: 0,
      like: 0,
      isFeatured: false,
    }
  }

  addNewCategory() {
    this._formService.controlForm(
      'category',
      { isDisplay: true, type: 'create', category: { logo: '', name: name, color: '' } }
    );
  }

  deletePost() {
    this._formService.controlForm(
      'destroy',
      { isDisplay: true, service: 'post', title: 'Post', destroyData: { value: this.editPost.title, id: this.editPost.id } }
    );
  }
}
