import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'board-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  get userEmail() {
    if (!this._authService.isLoggedInGuard) return '';
    return JSON.parse(localStorage.getItem('user') as string).email;
  }

  async logout() {
    await this._authService.logout(this.userEmail);
  }
}
