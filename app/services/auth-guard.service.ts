import { Injectable }       from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';
import { AuthenticationService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // replace # of url
        let url: string = state.url.replace("#", "");
        
        if (this.authService.loggedIn()) {
            return true;
        }
        
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }
}