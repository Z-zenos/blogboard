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
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    this.userEmail = user ? user.email : 'zenos';
  }

  async logout() {
    await this._authService.logout(this.userEmail);
  }
}
