import { Component, OnInit }   from '@angular/core';

import { APIService }       from './../../services/api.service';
import { SharedService }    from './../../services/shared.service';
import { Order }            from './../../models/order';

@Component({
    moduleId: module.id,
    selector: 'my-shoppingCart',
    templateUrl: 'shoppingCart.component.html'
})

export class ShoppingCartComponent implements OnInit {
    orders: Order[] = [];
    isCompleted: boolean = true;
    isOrdering: boolean = true;
    msgClass: string = "ui message";
    orderSuccess: boolean = false;
    
    constructor(
        private aPIService: APIService,
        private sharedService: SharedService
    ) { }

    // Component is initialized
    ngOnInit(): void {
        this.getOrders();
    }
    
    getOrders(): void {
        this.orders = this.aPIService.getShoppingCartOrders();
    }
    
    removeOrder(id: number): void {
        for (let i = 0; i < this.orders.length; i ++) {
            if (this.orders[i].id == id) {
                this.orders.splice(i, 1);
                this.sharedService.reduce();
                break;
            }
        }
        
        console.log(id);
    }
    
    submitAllOrders(): void {
        this.isOrdering = false;
        this.orders = [];
        this.sharedService.reset();
        // Test Methoden Aufruf
        setTimeout(() => this.orderSubmittedSuccessfull(), 1000);
    }
    
    // Wenn die Bestellung erfolgreich übertragen wurde
    orderSubmittedSuccessfull(): void {
        this.isOrdering = true;
        this.orderSuccess = true;
        this.aPIService.updateShoppingCartOrders();
    }
    
    hideMsg() {
        this.orderSuccess = false;
    }
    
    goBack(): void {
        // go back to the last page
        window.history.back();
    }
}