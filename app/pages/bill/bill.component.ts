import { Component, OnInit }   from '@angular/core';

import { APIService }       from './../../services/api.service';
import { Order }            from './../../models/order';

@Component({
    moduleId: module.id,
    selector: 'my-bill',
    templateUrl: 'bill.component.html'
})

export class BillComponent implements OnInit {
    orders: Order[] = [];
    isCompleted: boolean = true;
    billPrice: number = 0;
    isWaiterCalled: boolean = false;
    
    constructor(
        private aPIService: APIService
    ) { }

    // Component is initialized
    ngOnInit(): void {
        this.getOrders();
    }
    
    getOrders(): void {
        this.orders = this.aPIService.getBillOrders();
        for (let i = 0; i < this.orders.length; i++) {
            this.billPrice += this.orders[i].product.price * this.orders[i].amount;
        }
    }
    
    callWaiter(): void {
        this.isWaiterCalled = true;
    }
    
    hideMsg() {
        this.isWaiterCalled = false;
    }
    
    goBack(): void {
        // go back to the last page
        window.history.back();
    }
}