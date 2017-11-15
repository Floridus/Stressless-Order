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
var BillComponent = (function () {
    function BillComponent(aPIService) {
        this.aPIService = aPIService;
        this.orders = [];
        this.isCompleted = true;
        this.billPrice = 0;
        this.isWaiterCalled = false;
    }
    // Component is initialized
    BillComponent.prototype.ngOnInit = function () {
        this.getOrders();
    };
    BillComponent.prototype.getOrders = function () {
        this.orders = this.aPIService.getBillOrders();
        for (var i = 0; i < this.orders.length; i++) {
            this.billPrice += this.orders[i].product.price * this.orders[i].amount;
        }
    };
    BillComponent.prototype.callWaiter = function () {
        this.isWaiterCalled = true;
    };
    BillComponent.prototype.hideMsg = function () {
        this.isWaiterCalled = false;
    };
    BillComponent.prototype.goBack = function () {
        // go back to the last page
        window.history.back();
    };
    return BillComponent;
}());
BillComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-bill',
        templateUrl: 'bill.component.html'
    }),
    __metadata("design:paramtypes", [api_service_1.APIService])
], BillComponent);
exports.BillComponent = BillComponent;
//# sourceMappingURL=bill.component.js.map