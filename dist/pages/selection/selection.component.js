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
var SelectionComponent = (function () {
    function SelectionComponent(aPIService, route) {
        this.aPIService = aPIService;
        this.route = route;
        this.categories = [];
        this.tmpCategories = [];
        this.categoryId = null;
        this.isCompleted = true;
    }
    // Component is initialized
    SelectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            // only numbers are allowed
            _this.categoryId = Number(params['id']);
            // security check
            if (isNaN(_this.categoryId)) {
                _this.categoryId = null;
            }
            else {
                _this.categoryName = _this.aPIService.getCategoryName(_this.categoryId);
            }
            _this.isCompleted = false;
            _this.getCategories();
        });
        //console.log(this.aPIService.getBrowser());
    };
    // eigene Änderungserkennung
    SelectionComponent.prototype.ngDoCheck = function () {
        if (this.tmpCategories.length > 0 && this.categories.length == 0) {
            var len = this.tmpCategories.length;
            if (this.categoryId === null) {
                for (var i = 0; i < len; i++) {
                    if (typeof this.tmpCategories[i].parent === 'undefined') {
                        this.categories.push(this.tmpCategories[i]);
                    }
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    if (typeof this.tmpCategories[i].parent !== 'undefined') {
                        if (this.tmpCategories[i].parent.id == this.categoryId) {
                            this.categories.push(this.tmpCategories[i]);
                        }
                    }
                }
            }
        }
        if (this.categories.length > 0) {
            this.isCompleted = true;
        }
    };
    SelectionComponent.prototype.getCategories = function () {
        this.tmpCategories = this.aPIService.getCategories();
    };
    SelectionComponent.prototype.goBack = function () {
        // go back to the last page
        window.history.back();
    };
    return SelectionComponent;
}());
SelectionComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-selection',
        templateUrl: 'selection.component.html'
    }),
    __metadata("design:paramtypes", [api_service_1.APIService,
        router_1.ActivatedRoute])
], SelectionComponent);
exports.SelectionComponent = SelectionComponent;
//# sourceMappingURL=selection.component.js.map