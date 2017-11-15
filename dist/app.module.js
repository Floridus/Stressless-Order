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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng_semantic_1 = require("ng-semantic");
var app_component_1 = require("./pages/app.component");
var login_component_1 = require("./pages/login/login.component");
var selection_component_1 = require("./pages/selection/selection.component");
var category_component_1 = require("./pages/category/category.component");
var product_component_1 = require("./pages/product/product.component");
var shoppingCart_component_1 = require("./pages/shoppingCart/shoppingCart.component");
var bill_component_1 = require("./pages/bill/bill.component");
var app_routing_1 = require("./app.routing");
var auth_service_1 = require("./services/auth.service");
var api_service_1 = require("./services/api.service");
var shared_service_1 = require("./services/shared.service");
var auth_guard_service_1 = require("./services/auth-guard.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            ng_semantic_1.NgSemanticModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            selection_component_1.SelectionComponent,
            category_component_1.CategoryComponent,
            product_component_1.ProductComponent,
            shoppingCart_component_1.ShoppingCartComponent,
            bill_component_1.BillComponent
        ],
        providers: [
            auth_service_1.AuthenticationService,
            api_service_1.APIService,
            shared_service_1.SharedService,
            auth_guard_service_1.AuthGuard
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map