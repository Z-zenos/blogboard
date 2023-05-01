import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'board-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
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

}
