import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { APIService }               from './../../services/api.service';
import { AuthenticationService }    from './../../services/auth.service';
import { Product }                  from './../../models/product';

@Component({
    moduleId: module.id,
    selector: 'my-product',
    templateUrl: 'product.component.html'
})

export class ProductComponent implements OnInit {
    errorMessage: string;
    productId: number;
    product: Product;
    numbers: Array<number>;
    isOrdering: boolean = true;
    msgClass: string = "ui message";
    msgHeader: string = "";
    msgInfo: string = "";
    orderSuccess: boolean;

    constructor(
        private route: ActivatedRoute,
        private aPIService: APIService,
        private authService: AuthenticationService
    ) {
        this.numbers = this.rangeNumbers(12);
    }

    rangeNumbers(count: number) {
        let x = Array<number>();
        let i = 1;
        while (x.push(i++) < count) { };

        return x;
    }

    // implement OnInit's `ngOnInit` method
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.productId = params['id'];
            if (this.productId) {
                this.getProduct();
            }
        });
    }

    getProduct(): void {
        this.product = this.aPIService.getProduct(this.productId);
    }

    goBack(): void {
        // go back to the last page
        window.history.back();
    }

    buyProduct(amount: number, changeInfo: string): void {
        this.isOrdering = false;
        this.aPIService.buyAPIProduct(this.productId, amount, changeInfo).subscribe(
            data => {
                this.orderSuccess = data.success;
                if (data.success) {
                    this.msgHeader = "Das Produkt wurde erfolgreich in den Warenkorb hinzugefügt."
                    this.msgInfo = "Um das Produkt endgültig zu bestellen, musst du beim Warenkorb auf Bestellen klicken.";
                } else {
                    let msg = data.message;
                    // if the string contains "Code" then logout the user
                    if (msg.indexOf("Code") !== -1) {
                        this.authService.logout();
                    }
                    this.msgHeader = msg;
                    this.msgInfo = "Es trat ein Fehler bei der Bestellung auf. Bitte melde das einem Kellner."
                }
                this.isOrdering = true;
            },
            error => {
                this.errorMessage = <any>error;
                this.isOrdering = true;
            }
        );
    }

    getMsgClass() {
        if (this.orderSuccess != undefined || this.orderSuccess != null) {
            if (this.orderSuccess) {
                return this.msgClass + " blue";
            } else {
                return this.msgClass + " red";
            }
        } else {
            return this.msgClass + " hidden";
        }
    }
    
    hideMsg() {
        this.orderSuccess = null;
    }
}