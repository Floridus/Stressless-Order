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
var api_service_1 = require("./../../services/api.service");
var auth_service_1 = require("./../../services/auth.service");
var ProductComponent = (function () {
    function ProductComponent(route, aPIService, authService) {
        this.route = route;
        this.aPIService = aPIService;
        this.authService = authService;
        this.isOrdering = true;
        this.msgClass = "ui message";
        this.msgHeader = "";
        this.msgInfo = "";
        this.numbers = this.rangeNumbers(12);
    }
    ProductComponent.prototype.rangeNumbers = function (count) {
        var x = Array();
        var i = 1;
        while (x.push(i++) < count) { }
        ;
        return x;
    };
    // implement OnInit's `ngOnInit` method
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.productId = params['id'];
            if (_this.productId) {
                _this.getProduct();
            }
        });
    };
    ProductComponent.prototype.getProduct = function () {
        this.product = this.aPIService.getProduct(this.productId);
    };
    ProductComponent.prototype.goBack = function () {
        // go back to the last page
        window.history.back();
    };
    ProductComponent.prototype.buyProduct = function (amount, changeInfo) {
        var _this = this;
        this.isOrdering = false;
        this.aPIService.buyAPIProduct(this.productId, amount, changeInfo).subscribe(function (data) {
            _this.orderSuccess = data.success;
            if (data.success) {
                _this.msgHeader = "Das Produkt wurde erfolgreich in den Warenkorb hinzugefügt.";
                _this.msgInfo = "Um das Produkt endgültig zu bestellen, musst du beim Warenkorb auf Bestellen klicken.";
            }
            else {
                var msg = data.message;
                // if the string contains "Code" then logout the user
                if (msg.indexOf("Code") !== -1) {
                    _this.authService.logout();
                }
                _this.msgHeader = msg;
                _this.msgInfo = "Es trat ein Fehler bei der Bestellung auf. Bitte melde das einem Kellner.";
            }
            _this.isOrdering = true;
        }, function (error) {
            _this.errorMessage = error;
            _this.isOrdering = true;
        });
    };
    ProductComponent.prototype.getMsgClass = function () {
        if (this.orderSuccess != undefined || this.orderSuccess != null) {
            if (this.orderSuccess) {
                return this.msgClass + " blue";
            }
            else {
                return this.msgClass + " red";
            }
        }
        else {
            return this.msgClass + " hidden";
        }
    };
    ProductComponent.prototype.hideMsg = function () {
        this.orderSuccess = null;
    };
    return ProductComponent;
}());
ProductComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-product',
        templateUrl: 'product.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        api_service_1.APIService,
        auth_service_1.AuthenticationService])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map