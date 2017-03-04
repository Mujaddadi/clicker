import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this.auth.authenticated()) {
    console.log('Auth Guar Passed');
    return true;
  } else {
    console.log('Blocked By Auth Guard');
    this.router.navigate(['/']);
    return false;
  }
  }
}