import { Injectable, Output, EventEmitter } from '@angular/core'

/*
 * Event Emitter change the number of products in the shopping cart 
 * by shared service
 */

@Injectable()
export class SharedService {
    @Output() fire: EventEmitter<any> = new EventEmitter();
    count: number = 0;
    
    add() {
        this.count ++;
        this.fire.emit(this.count);
    }
    
    reduce() {
        if (this.count > 0) {
            this.count --;
        }
        this.fire.emit(this.count);
    }
    
    reset() {
        this.count = 0;
        this.fire.emit(0);
    }

    change(count: number) {
        this.count = count;
        this.fire.emit(count);
    }

    getEmittedValue() {
        return this.fire;
    }
}