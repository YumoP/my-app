import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

class DecodedToken{
    exp: number = 0;
    username: string = '';
}
const jwt = new JwtHelperService();

@Injectable()
export class AuthService{
    private decodedToken;
    constructor(private http:HttpClient){
        this.decodedToken = JSON.parse(localStorage.getItem('meta')) || new DecodedToken();
    }
    private saveToken(token:string):string{
        console.log(token);
        this.decodedToken = jwt.decodeToken(token);
        console.log(this.decodedToken);
        localStorage.setItem('auth', token);
        localStorage.setItem('meta', JSON.stringify(this.decodedToken));
        return token;
    }
    public register(userData: any): Observable<any>{
        return this.http.post('/api/users/register', userData);
    }
    public login(userData: any): Observable<any>{
        return this.http.post('/api/users/login', userData).pipe(map(
            (token)=>{
                this.saveToken(JSON.stringify(token));
            }
        ));
    }
    public getToken(){
        return localStorage.getItem('auth');
    }
    public logout() {
        localStorage.removeItem('auth');
        localStorage.removeItem('meta');
        localStorage.removeItem('fields');
        this.decodedToken = new DecodedToken();
    }
    public getUsername (){
        return this.decodedToken.username;
    }
    public getUserdate (){
        return this.decodedToken.date;
    }
    private getExpiration(): any{
        return moment.unix(this.decodedToken.exp)
    }
    public isAuthenticated():boolean{
        return moment().isBefore(this.getExpiration());
    }
}