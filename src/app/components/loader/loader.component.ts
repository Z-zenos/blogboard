import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'board-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  displayLoader: boolean = false;

  constructor(private _loaderService: LoaderService) { }

  ngOnInit(): void {
    this._loaderService.loader$.subscribe((on: boolean) => {
      this.displayLoader = on;
    });
  }

}
