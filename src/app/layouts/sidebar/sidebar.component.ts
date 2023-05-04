import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'board-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  routes: string[] = ['categories', 'posts', 'write', 'setting'];

  currentRoute: string = '';

  constructor(private _router: Router) {

  }

  ngOnInit(): void {
    //Router subscriber
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentRoute = event.url;
      }
    });
  }

}
