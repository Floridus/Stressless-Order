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
// Add the RxJS Observable operators we need in this app.
require("./../rxjs-operators");
var myGlobals = require("./../globals");
var auth_service_1 = require("./../services/auth.service");
var shared_service_1 = require("./../services/shared.service");
var api_service_1 = require("./../services/api.service");
require("jquery");
var AppComponent = (function () {
    function AppComponent(authService, // wichtig !!!
        sharedService, aPIService) {
        this.authService = authService;
        this.sharedService = sharedService;
        this.aPIService = aPIService;
        this.company = myGlobals.company;
        this.showOverlay = false;
        this.menuCss = "ui sidebar right vertical inverted labled menu green huge";
        this.shopCss = "ui circular label";
        this.shoppingCartProducts = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Ruft alle Bestellungen des Tisches ab
        this.aPIService.getOrders();
        // Bekommt immer die Zahl mit, wie viele Produkte im Warenkorb vom eingeloggten Kunden sind
        this.sharedService.getEmittedValue().subscribe(function (item) { return _this.shoppingCartProducts = item; });
        // Nach einer Ladezeit von 2 Sekunden ruft es die noch im Warenkorb liegenden Produkte ab
        setTimeout(function () {
            var count = _this.aPIService.getShoppingCartCount();
            _this.sharedService.change(count);
        }, 3000);
    };
    AppComponent.prototype.getShoppingCartColor = function () {
        if (this.shoppingCartProducts == 0) {
            return this.shopCss;
        }
        else {
            return this.shopCss + " orange";
        }
    };
    AppComponent.prototype.getOverlay = function () {
        if (this.showOverlay) {
            return this.menuCss + " overlay visible";
        }
        else {
            return this.menuCss;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: 'app.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthenticationService,
        shared_service_1.SharedService,
        api_service_1.APIService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map