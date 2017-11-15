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
var api_service_1 = require("./../../services/api.service");
var shared_service_1 = require("./../../services/shared.service");
var ShoppingCartComponent = (function () {
    function ShoppingCartComponent(aPIService, sharedService) {
        this.aPIService = aPIService;
        this.sharedService = sharedService;
        this.orders = [];
        this.isCompleted = true;
        this.isOrdering = true;
        this.msgClass = "ui message";
        this.orderSuccess = false;
    }
    // Component is initialized
    ShoppingCartComponent.prototype.ngOnInit = function () {
        this.getOrders();
    };
    ShoppingCartComponent.prototype.getOrders = function () {
        this.orders = this.aPIService.getShoppingCartOrders();
    };
    ShoppingCartComponent.prototype.removeOrder = function (id) {
        for (var i = 0; i < this.orders.length; i++) {
            if (this.orders[i].id == id) {
                this.orders.splice(i, 1);
                this.sharedService.reduce();
                break;
            }
        }
        console.log(id);
    };
    ShoppingCartComponent.prototype.submitAllOrders = function () {
        var _this = this;
        this.isOrdering = false;
        this.orders = [];
        this.sharedService.reset();
        // Test Methoden Aufruf
        setTimeout(function () { return _this.orderSubmittedSuccessfull(); }, 1000);
    };
    // Wenn die Bestellung erfolgreich übertragen wurde
    ShoppingCartComponent.prototype.orderSubmittedSuccessfull = function () {
        this.isOrdering = true;
        this.orderSuccess = true;
        this.aPIService.updateShoppingCartOrders();
    };
    ShoppingCartComponent.prototype.hideMsg = function () {
        this.orderSuccess = false;
    };
    ShoppingCartComponent.prototype.goBack = function () {
        // go back to the last page
        window.history.back();
    };
    return ShoppingCartComponent;
}());
ShoppingCartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-shoppingCart',
        templateUrl: 'shoppingCart.component.html'
    }),
    __metadata("design:paramtypes", [api_service_1.APIService,
        shared_service_1.SharedService])
], ShoppingCartComponent);
exports.ShoppingCartComponent = ShoppingCartComponent;
//# sourceMappingURL=shoppingCart.component.js.map