import { Injectable } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ToastService } from './toast.service';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedInGuard: boolean = false;

  constructor(
    private _auth: Auth,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    private _router: Router
  ) { }

  async login(email: string, password: string) {
    try {
      this._loaderService.control(true);
      await signInWithEmailAndPassword(this._auth, email, password);
      this._toastService.success("Success", "Welcome back, Zenos.");
      this.isLoggedInGuard = true;
      this.setUser();
      await this._router.navigate(['/categories']);
    }
    catch (err) {
      this._toastService.error("Failure", "There seems to be a problem with the person trying to log in.");
    }
    finally {
      this._loaderService.control(false);
    }
  }

  setUser() {
    authState(this._auth).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  async logout(email: string) {
    try {
      this._loaderService.control(true);
      await signOut(this._auth);
      localStorage.removeItem('user');
      this.isLoggedInGuard = false;
      this._toastService.success("Success", `Bye, ${email} 👋.`);
      await this._router.navigate(['/login']);
    }
    catch (err) {
      this._toastService.error("Failure", "Can't log out.");
    }
    finally {
      this._loaderService.control(false);
    }
  }
}
