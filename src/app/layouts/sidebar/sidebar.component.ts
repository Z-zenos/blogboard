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
    this.currentRoute = this._router.url;
    //Router subscriber
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentRoute = event.url;
        console.log("Current nav: ", this.currentRoute);

      }
    });
  }

}
