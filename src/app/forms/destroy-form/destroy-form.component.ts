import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'board-destroy-form',
  templateUrl: './destroy-form.component.html',
  styleUrls: ['./destroy-form.component.scss']
})
export class DestroyFormComponent implements OnInit {
  @Input() title: string = '';
  @Input() value: string = '';

  form!: FormGroup;
  numberChars: number = this.value.length;
  count: number = 0;
  formValid: boolean = false;


  @Output() closeFormEvent = new EventEmitter<boolean>();

  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      destroyedThing: ['', Validators.required],
    });
    this.numberChars = this.value.length;
  }

  async onSubmit() {
    console.log(this.count, this.formValid);

    try {
      if (!this.formValid) throw new Error("Please fill input.");
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

  checkDestroyedName(e: KeyboardEvent) {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      this.count--;
    }
    else {
      this.count++;
    }
    console.log(this.count, this.numberChars, (e.target as HTMLInputElement).value);

    if (this.count === this.numberChars && (e.target as HTMLInputElement).value === this.value) {
      this.formValid = true;
    }
  }

}
