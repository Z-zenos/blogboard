import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'board-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isDisplayForm: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

  openForm() {
    this.isDisplayForm = true;
  }

  closeForm(isClose: boolean) {
    this.isDisplayForm = isClose;
  }

}
