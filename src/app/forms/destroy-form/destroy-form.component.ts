import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDestroyForm } from 'src/app/models/destroy-form.interface';
import { CategoryService } from 'src/app/services/category.service';
import { FormService } from 'src/app/services/form.service';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'board-destroy-form',
  templateUrl: './destroy-form.component.html',
  styleUrls: ['./destroy-form.component.scss']
})
export class DestroyFormComponent implements OnInit {
  isDisplay: boolean = false;
  title: string = ''; // title of destroy form
  destroyData: any = { value: '', id: '' }; // Value for re-check if remove or not and id of value for call to backend
  service: string = ''; // category | post

  form!: FormGroup;
  numberChars: number = 0;
  count: number = 0;
  formValid: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _formService: FormService
  ) { }

  ngOnInit(): void {
    this._formService.destroyForm$.subscribe((data: IDestroyForm) => {
      this.isDisplay = data.isDisplay;

      if (this.isDisplay) {
        this.title = data.title ?? '';
        this.destroyData = data.destroyData ?? { value: '', id: '' };
        this.service = data.service ?? '';
      }
      this.numberChars = this.destroyData.value.length;
    });

    this.form = this._fb.group({
      destroyedThing: ['', Validators.required],
    });
  }

  async onSubmit() {
    try {
      if (!this.formValid) throw new Error("Please fill input.");

      switch (this.service) {
        case 'category':
          await this._categoryService.delete(this.destroyData.id);
          break;

        case 'post':
          await this._postService.delete(this.destroyData.id);
          break;
      }

      this._toastService.success("Successfully", `${this.form.value.destroyedThing} destroyed.`);
      this.onClose();
    }
    catch (e: any) {
      this._toastService.error("Failure", `Can't delete ${this.form.value.destroyedThing}. Message: ${e.message}`);
    }
    finally {
      this.form.reset();
      this.formValid = false;
      this.count = 0;
    }
  }

  onClose(): void {
    this._formService.controlForm('destroy', { isDisplay: false });
  }

  checkDestroyedValue(e: InputEvent) {
    if (e.inputType === 'deleteByCut' || e.inputType === 'insertByPaste' || !(e.target as HTMLInputElement).value) {
      this.count = 0;
    }
    else if (e.inputType === 'deleteContentForward' || e.inputType === 'deleteContentBackward') {
      this.count--;
      this.count = Math.max(0, this.count);
    }
    else if (e.inputType === 'insertText') {
      this.count++;
    }

    if (this.count === this.numberChars && (e.target as HTMLInputElement).value === this.destroyData.value) {
      this.formValid = true;
    }
    else this.formValid = false;
  }

}
