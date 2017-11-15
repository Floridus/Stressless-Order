"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("./../../services/auth.service");
var LoginComponent = (function () {
    function LoginComponent(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.isCompleted = true;
    }
    // implement OnInit's `ngOnInit` method
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var token = params['token'];
            if (token) {
                _this.isCompleted = false;
                _this.login(token);
            }
        });
    };
    LoginComponent.prototype.login = function (token) {
        var _this = this;
        this.authService.login(token).subscribe(function (login) {
            if (login) {
                _this.router.navigate([_this.authService.redirectUrl]);
            }
            else {
                _this.isCompleted = true;
                _this.loginError = "Der QR-Code ist nicht gültig.";
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-login',
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthenticationService,
        router_1.Router,
        router_1.ActivatedRoute])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map