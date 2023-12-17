import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '@mean/models';
import { AuthService } from '@mean/services';
import { SessionStorageConstants } from '@mean/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logo = '../../../assets/logo.png';
  showMenuLogin = true;
  constructor(
    private router: Router,
    private readonly auth: AuthService
  ) {
    this.showMenuLogin = this.auth.readFromSesion(SessionStorageConstants.USER_TOKEN).user.id === 0;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
