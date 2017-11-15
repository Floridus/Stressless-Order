"use strict";
var router_1 = require("@angular/router");
var auth_guard_service_1 = require("./services/auth-guard.service");
var login_component_1 = require("./pages/login/login.component");
var selection_component_1 = require("./pages/selection/selection.component");
var category_component_1 = require("./pages/category/category.component");
var product_component_1 = require("./pages/product/product.component");
var shoppingCart_component_1 = require("./pages/shoppingCart/shoppingCart.component");
var bill_component_1 = require("./pages/bill/bill.component");
var appRoutes = [
    {
        path: '',
        redirectTo: '/selection',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'login/:token',
        component: login_component_1.LoginComponent
    },
    {
        path: 'selection',
        component: selection_component_1.SelectionComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'selection/:id',
        component: selection_component_1.SelectionComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'category/:id',
        component: category_component_1.CategoryComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'product/:id',
        component: product_component_1.ProductComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'shoppingCart',
        component: shoppingCart_component_1.ShoppingCartComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'bill',
        component: bill_component_1.BillComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map