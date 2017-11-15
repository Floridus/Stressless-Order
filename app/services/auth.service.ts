import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Router }   from '@angular/router';

import myGlobals = require('./../globals');

@Injectable()
export class AuthenticationService {
    // store the URL so we can redirect after logging in
    redirectUrl: string = '/selection';

    constructor(
        public http: Http,
        public router: Router
    ) { }

    loggedIn(): boolean {
        if (localStorage.getItem("auth_token") === null) {
            return false;
        }

        return true;
    }

    logout(): void {
        localStorage.removeItem("auth_token");
        this.router.navigate(["/login"]);
    }

    login(token: string) {
        let apiToken = myGlobals.apiToken;
        let body = JSON.stringify({ auth_token: token, api_token: apiToken });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let apiUrl = myGlobals.apiUrl + '/checkLogin';

        return this.http
            .post(apiUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    extractData(res: Response) {
        let body = res.json();
        if (body.success) {
            localStorage.setItem('auth_token', body.token);
        }

        return body.success;
    }

    handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}