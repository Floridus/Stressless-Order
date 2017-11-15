import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from './../../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    errorMessage: string;
    loginError: string;
    isCompleted: boolean = true;

    // implement OnInit's `ngOnInit` method
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let token = params['token']
            if (token) {
                this.isCompleted = false;
                this.login(token);
            }
        });
    }

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    login(token: string) {
        this.authService.login(token).subscribe(
            login => {
                if (login) {
                    this.router.navigate([this.authService.redirectUrl]);
                } else {
                    this.isCompleted = true;
                    this.loginError = "Der QR-Code ist nicht gültig.";
                }
            },
            error => this.errorMessage = <any>error);
    }
}