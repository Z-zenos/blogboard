import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'board-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('btnLogin', { static: false }) btnLogin!: ElementRef;

  form!: FormGroup;
  isShowPassword: boolean = false;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

  onSubmit() {
    console.log(this.form.value);

  }

  avoidClick() {
    console.log('avoid');
    console.log(this.form.valid);


    if (this.form.invalid) {
      this.btnLogin.nativeElement.classList.toggle('btn--avoid');
    }
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
