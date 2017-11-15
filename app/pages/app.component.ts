import { Component, OnInit } from '@angular/core';

// Add the RxJS Observable operators we need in this app.
import './../rxjs-operators';

import myGlobals = require('./../globals');

import { AuthenticationService } from './../services/auth.service';
import { SharedService }         from './../services/shared.service';
import { APIService }           from './../services/api.service';

import 'jquery';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    company: string = myGlobals.company;
    showOverlay: boolean = false;
    menuCss: string = "ui sidebar right vertical inverted labled menu green huge";
    shopCss: string = "ui circular label";
    shoppingCartProducts: number = 0;

    constructor(
        private authService: AuthenticationService, // wichtig !!!
        private sharedService: SharedService,
        private aPIService: APIService
    ) { }

    ngOnInit() {
        // Ruft alle Bestellungen des Tisches ab
        this.aPIService.getOrders();
        // Bekommt immer die Zahl mit, wie viele Produkte im Warenkorb vom eingeloggten Kunden sind
        this.sharedService.getEmittedValue().subscribe(
            (item: any) => this.shoppingCartProducts = item
        );
        // Nach einer Ladezeit von 2 Sekunden ruft es die noch im Warenkorb liegenden Produkte ab
        setTimeout(() => {
            let count = this.aPIService.getShoppingCartCount();
            this.sharedService.change(count);
        }
        , 3000);
    }
    
    getShoppingCartColor() {
        if (this.shoppingCartProducts == 0) {
            return this.shopCss;
        } else {
           return this.shopCss + " orange"; 
        }
    }

    getOverlay() {
        if (this.showOverlay) {
            return this.menuCss + " overlay visible";
        } else {
            return this.menuCss;
        }
    }
}