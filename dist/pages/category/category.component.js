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
var shared_service_1 = require("./../../services/shared.service");
var auth_service_1 = require("./../../services/auth.service");
var CategoryComponent = (function () {
    function CategoryComponent(router, route, aPIService, authService, sharedService) {
        this.router = router;
        this.route = route;
        this.aPIService = aPIService;
        this.authService = authService;
        this.sharedService = sharedService;
        this.products = [];
        this.tmpProducts = [];
        this.isCompleted = true;
        this.isOrdering = true;
        this.msgClass = "ui message";
        this.msgHeader = "";
        this.msgInfo = "";
    }
    // implement OnInit's `ngOnInit` method
    CategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.categoryId = params['id'];
            if (_this.categoryId) {
                _this.isCompleted = false;
                _this.getProducts();
                _this.categoryName = _this.aPIService.getCategoryName(_this.categoryId);
            }
        });
    };
    // eigene Änderungserkennung
    CategoryComponent.prototype.ngDoCheck = function () {
        if (this.tmpProducts.length > 0 && this.products.length == 0) {
            var len = this.tmpProducts.length;
            for (var i = 0; i < len; i++) {
                if (this.tmpProducts[i].category.id == this.categoryId) {
                    this.products.push(this.tmpProducts[i]);
                }
            }
        }
        if (this.products.length > 0) {
            this.isCompleted = true;
        }
    };
    CategoryComponent.prototype.getProducts = function () {
        this.tmpProducts = this.aPIService.getProducts();
    };
    CategoryComponent.prototype.goBack = function () {
        // go back to the last page
        window.history.back();
    };
    CategoryComponent.prototype.linkProduct = function (productId) {
        this.router.navigate(["/product", productId]);
    };
    CategoryComponent.prototype.buyProduct = function (productId) {
        var _this = this;
        this.isOrdering = false;
        this.aPIService.buyAPIProduct(productId, 1, "").subscribe(function (data) {
            _this.orderSuccess = data.success;
            if (data.success) {
                _this.msgHeader = "Das Produkt wurde erfolgreich in den Warenkorb hinzugefügt.";
                _this.msgInfo = "Um das Produkt endgültig zu bestellen, musst du beim Warenkorb auf Bestellen klicken.";
                _this.sharedService.add();
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
    CategoryComponent.prototype.getMsgClass = function () {
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
    CategoryComponent.prototype.hideMsg = function () {
        this.orderSuccess = null;
    };
    return CategoryComponent;
}());
CategoryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-category',
        templateUrl: 'category.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        api_service_1.APIService,
        auth_service_1.AuthenticationService,
        shared_service_1.SharedService])
], CategoryComponent);
exports.CategoryComponent = CategoryComponent;
//# sourceMappingURL=category.component.js.map