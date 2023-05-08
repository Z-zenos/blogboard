import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'board-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userEmail: string = '';

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    console.log('Header');
    return JSON.parse(localStorage.getItem('user') as string) && JSON.parse(localStorage.getItem('user') as string).email;
  }

  async logout() {
    await this._authService.logout(this.userEmail);
  }
}
