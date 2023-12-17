import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionStorageConstants } from '../utils/session.storage';

@Injectable({
  providedIn: 'root'
})

export class HomeGuard {
  constructor(
    private readonly router: Router,
    private auth: AuthService
  ) {}

  canActivate(): boolean {
    const checkSession = this.auth.readFromSesion(SessionStorageConstants.USER_TOKEN)
    if (checkSession.user.id === 0){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
