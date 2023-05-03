import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'board-destroy-form',
  templateUrl: './destroy-form.component.html',
  styleUrls: ['./destroy-form.component.scss']
})
export class DestroyFormComponent implements OnInit {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() id: string | undefined = '';

  form!: FormGroup;
  numberChars: number = 0;
  count: number = 0;
  formValid: boolean = false;


  @Output() closeFormEvent = new EventEmitter<boolean>();

  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      destroyedThing: ['', Validators.required],
    });
    this.numberChars = this.value.length;
  }

  async onSubmit() {
    try {
      if (!this.formValid) throw new Error("Please fill input.");
      await this._categoryService.delete(this.id);
      this._toastService.success("Successfully", `${this.form.value.destroyedThing} destroyed.`);
      this.onClose();
    }
    catch (e: any) {
      this._toastService.error("Failure", `Can't delete ${this.form.value.destroyedThing}. Message: ${e.message}`);
      this.formValid = false;
    }
    finally {
      this.form.reset();
      this.formValid = false;
      this.count = 0;
    }
  }

  onClose(): void {
    this.closeFormEvent.emit(false);
  }

  checkDestroyedName(e: InputEvent) {
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

    if (this.count === this.numberChars && (e.target as HTMLInputElement).value === this.value) {
      this.formValid = true;
    }
    else this.formValid = false;
  }

}
