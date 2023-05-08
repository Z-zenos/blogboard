import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ToastService } from './toast.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _auth: Auth,
    private _toastService: ToastService,
    private _loaderService: LoaderService
  ) { }

  async login(email: string, password: string) {
    try {
      this._loaderService.control(true);
      await signInWithEmailAndPassword(this._auth, email, password);
      this._toastService.success("Success", "Welcome back, Zenos.");
    }
    catch (err) {
      this._toastService.error("Failure", "There seems to be a problem with the person trying to log in.");
    }
    finally {
      this._loaderService.control(false);
    }
  }
}
