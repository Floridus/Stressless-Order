import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { APIService }               from './../../services/api.service';
import { SharedService }            from './../../services/shared.service';
import { AuthenticationService }    from './../../services/auth.service';
import { Product }                  from './../../models/product';

@Component({
    moduleId: module.id,
    selector: 'my-category',
    templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {
    products: Product[] = [];
    tmpProducts: Product[] = [];
    errorMessage: string;
    isCompleted: boolean = true;
    categoryId: number;
    categoryName: string;
    isOrdering: boolean = true;
    msgClass: string = "ui message";
    msgHeader: string = "";
    msgInfo: string = "";
    orderSuccess: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private aPIService: APIService,
        private authService: AuthenticationService,
        private sharedService: SharedService
    ) { }

    // implement OnInit's `ngOnInit` method
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.categoryId = params['id'];
            if (this.categoryId) {
                this.isCompleted = false;
                this.getProducts();
                this.categoryName = this.aPIService.getCategoryName(this.categoryId);
            }
        });
    }

    // eigene Änderungserkennung
    ngDoCheck(): void {
        if (this.tmpProducts.length > 0 && this.products.length == 0) {
            let len = this.tmpProducts.length;
            for (let i = 0; i < len; i++) {
                if (this.tmpProducts[i].category.id == this.categoryId) {
                    this.products.push(this.tmpProducts[i]);
                }
            }
        }
        if (this.products.length > 0) {
            this.isCompleted = true;
        }
    }

    getProducts(): void {
        this.tmpProducts = this.aPIService.getProducts();
    }

    goBack(): void {
        // go back to the last page
        window.history.back();
    }
    
    linkProduct(productId: number): void {
        this.router.navigate(["/product", productId]);
    }
    
    buyProduct(productId: number): void {
        this.isOrdering = false;
        this.aPIService.buyAPIProduct(productId, 1, "").subscribe(
            data => {
                this.orderSuccess = data.success;
                if (data.success) {
                    this.msgHeader = "Das Produkt wurde erfolgreich in den Warenkorb hinzugefügt."
                    this.msgInfo = "Um das Produkt endgültig zu bestellen, musst du beim Warenkorb auf Bestellen klicken.";
                    this.sharedService.add();
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