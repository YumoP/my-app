import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private url: String;
    constructor(private authService: AuthService,
        private router: Router) {}
    
    private Auth():boolean{
        if(this.isLoginOrRegis()) {
            this.router.navigate(['./home']);
            return false;
        }
        return true;
    }
    private notAuth():boolean{
        this.authService.logout();
        if(this.isLoginOrRegis()) {
            return true;
        }
        this.router.navigate(['./login']);
        return false;
    }
    private isLoginOrRegis():boolean{
        if(this.url.includes('login') || this.url.includes('register')){
            return true;
        }   
        return false;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        this.url = state.url;
        if(this.authService.isAuthenticated()){
            return this.Auth();
        }
        return this.notAuth();
    }
}
