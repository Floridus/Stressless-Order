import { Component, OnInit, DoCheck }   from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';

import { APIService }       from './../../services/api.service';
import { Category }         from './../../models/category';

@Component({
    moduleId: module.id,
    selector: 'my-selection',
    templateUrl: 'selection.component.html'
})

export class SelectionComponent implements OnInit, DoCheck {
    categories: Category[] = [];
    tmpCategories: Category[] = [];
    categoryId: number = null;
    errorMessage: string;
    isCompleted: boolean = true;
    categoryName: string;
    
    constructor(
        private aPIService: APIService,
        private route: ActivatedRoute
    ) { }

    // Component is initialized
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            // only numbers are allowed
            this.categoryId = Number(params['id']);
            // security check
            if (isNaN(this.categoryId)) {
                this.categoryId = null;
            } else {
                this.categoryName = this.aPIService.getCategoryName(this.categoryId);
            }
            this.isCompleted = false;
            this.getCategories();
        });
        
        //console.log(this.aPIService.getBrowser());
    }

    // eigene Änderungserkennung
    ngDoCheck(): void {
        if (this.tmpCategories.length > 0 && this.categories.length == 0) {
            let len = this.tmpCategories.length;
            if (this.categoryId === null) {
                for (let i = 0; i < len; i++) {
                    if (typeof this.tmpCategories[i].parent === 'undefined') {
                        this.categories.push(this.tmpCategories[i]);
                    }
                }
            } else {
                for (let i = 0; i < len; i++) {
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
    }

    getCategories(): void {
        this.tmpCategories = this.aPIService.getCategories();
    }
    
    goBack(): void {
        // go back to the last page
        window.history.back();
    }
}