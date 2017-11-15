import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule, JsonpModule }  from '@angular/http';
import { NgSemanticModule }         from 'ng-semantic';

import { AppComponent }             from './pages/app.component';
import { LoginComponent }           from './pages/login/login.component';
import { SelectionComponent }       from './pages/selection/selection.component';
import { CategoryComponent }        from './pages/category/category.component';
import { ProductComponent }         from './pages/product/product.component';
import { ShoppingCartComponent }    from './pages/shoppingCart/shoppingCart.component';
import { BillComponent }            from './pages/bill/bill.component';
import { routing }                  from './app.routing';

import { AuthenticationService } from './services/auth.service';
import { APIService }            from './services/api.service';
import { SharedService }         from './services/shared.service';
import { AuthGuard }             from './services/auth-guard.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgSemanticModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SelectionComponent,
        CategoryComponent,
        ProductComponent,
        ShoppingCartComponent,
        BillComponent
    ],
    providers: [
        AuthenticationService,
        APIService,
        SharedService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }