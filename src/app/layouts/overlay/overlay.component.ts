import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'board-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  overlay: boolean = false;

  constructor(private _overlayService: OverlayService) { }

  ngOnInit(): void {
    this._overlayService.overlay$.subscribe((on: boolean) => {
      this.overlay = on;
    });
  }
}
