import { Injectable }                               from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { Router }                                   from '@angular/router';
import { Observable }                               from 'rxjs/Observable';

import { Category }         from './../models/category';
import { Product }          from './../models/product';
import { Order }            from './../models/order';
import myGlobals = require('./../globals');

@Injectable()
export class APIService {
    // Define the routes we are going to interact with
    private apiUrl = myGlobals.apiUrl;
    private categories: Category[] = [];
    private products: Product[] = [];
    private orders: Order[] = [];

    constructor(private http: Http, private router: Router) { }

    getCategoryName(catId: number): string {
        if (this.categories.length == 0) {
            this.router.navigate(['/selection']);
            return null;
        } else {
            let catName = "";
            this.categories.forEach((elem) => {
                if (elem.id == catId) {
                    catName = elem.name;
                }
            });
            return catName;
        }
    }

    getCategories(): Category[] {
        if (this.categories.length == 0) {
            this.getAPICategories().subscribe(
                categories => {
                    for (let i = 0; i < categories.length; i++) {
                        let category = new Category();
                        category = JSON.parse(String(categories[i]));
                        this.categories.push(category);
                    }
                },
                error => <any>error
            );
        }

        return this.categories;
    }

    getProduct(prodId: number): Product {
        if (this.products.length == 0) {
            this.router.navigate(['/selection']);
            return null;
        } else {
            let product: Product;
            this.products.forEach((elem) => {
                if (elem.id == prodId) {
                    product = elem;
                }
            });
            return product;
        }
    }

    getProducts(): Product[] {
        if (this.products.length == 0) {
            this.getAPIProducts().subscribe(
                products => {
                    for (let i = 0; i < products.length; i++) {
                        let product = new Product();
                        product = JSON.parse(String(products[i]));
                        this.products.push(product);
                    }
                },
                error => <any>error
            );
        }

        return this.products;
    }
    
    getOrders(): Order[] {
        if (this.orders.length == 0) {
            this.getAPIOrders().subscribe(
                orders => {
                    for (let i = 0; i < orders.length; i++) {
                        let order = new Order();
                        order = JSON.parse(String(orders[i]));
                        this.orders.push(order);
                    }
                },
                error => <any>error
            );
        }

        return this.orders;
    }
    
    updateShoppingCartOrders(): void {
        if (this.orders.length > 0) {
            for (let i = 0; i < this.orders.length; i++) {
                let order = this.orders[i];
                if (order.is_ordered == false && order.is_canceled == false) {
                    this.orders[i].is_ordered = true;
                }
            }
        }
    }
    
    getShoppingCartOrders(): Order[] {
        let orders: Order[] = [];
        
        if (this.orders.length > 0) {
            for (let i = 0; i < this.orders.length; i++) {
                let order = this.orders[i];
                // Wenn die Produkte noch nicht bestellt sind
                if (order.is_ordered == false && order.is_canceled == false) {
                    orders.push(order);
                }
            }
        }
        
        return orders;
    }
    
    getBillOrders(): Order[] {
        let orders: Order[] = [];
        
        if (this.orders.length > 0) {
            for (let i = 0; i < this.orders.length; i++) {
                let order = this.orders[i];
                // Wenn die Produkte bereits bestellt sind
                if (order.is_ordered == true && order.is_canceled == false) {
                    orders.push(order);
                }
            }
        }
        
        return orders;
    }
    
    getShoppingCartCount(): number {
        if (this.orders.length > 0) {
            let count = 0;
            for (let i = 0; i < this.orders.length; i++) {
                let order = this.orders[i];
                if (order.is_ordered == false && order.is_canceled == false) {
                    count ++;
                }
            }
            return count;
        } else {
            return 0;
        }
    }

    buyAPIProduct(prodId: number, amount: number, notice: string) {
        let apiToken = myGlobals.apiToken;
        let customerToken = localStorage.getItem("auth_token");
        let smartPhoneDetails = this.getBrowser();
        
        let body = JSON.stringify({
            api_token: apiToken,
            customer_token: customerToken,
            prod_id: prodId,
            sp_details: smartPhoneDetails,
            amount: amount,
            notice: notice
        });
        
        let product = null;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id == prodId) {
                product = this.products[i];
                break;
            }
        }
        
        let order = new Order();
        order.id = this.getRandomInt(10, 100);
        order.product = product;
        order.amount = amount;
        order.is_ordered = false;
        order.is_canceled = false;
        order.is_ready = false;
        this.orders.push(order);
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let apiUrl = myGlobals.apiUrl + '/buyProduct';

        return this.http
            .post(apiUrl, body, options)
            .map(this.extractDataWithMessage)
            .catch(this.handleError);
    }
    
    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getAPICategories(): Observable<Category[]> {
        return this.http.get(this.apiUrl + '/getCategories')
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAPIProducts(): Observable<Product[]> {
        return this.http.get(this.apiUrl + '/getProducts')
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getAPIOrders(): Observable<Order[]> {
        let apiToken = myGlobals.apiToken;
        let customerToken = localStorage.getItem("auth_token");
        
        let body = JSON.stringify({
            api_token: apiToken,
            customer_token: customerToken
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let apiUrl = myGlobals.apiUrl + '/getOrders';

        return this.http
            .post(apiUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    
    private extractDataWithMessage(res: Response) {
        let body = res.json();
        let ret = {
            "success": body.success,
            "message": body.message
        };
        
        return ret;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    public getBrowser() {
        let dataos = [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ];
        let databrowser = [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ];

        let os = this.matchItem(dataos),
            browser = this.matchItem(databrowser);

        return { os: os, browser: browser };
    }

    private matchItem(data: Array<any>) {
        // The common (as any) style type assertion is a quickfix
        let agent = window.navigator.platform + " " + window.navigator.userAgent + " " + window.navigator.appVersion
            + " " + window.navigator.vendor + " " + (window as any).opera;

        let i = 0,
            j = 0,
            regex: RegExp,
            regexv: RegExp,
            match: boolean,
            matches: Array<string>,
            matchString: string,
            version: string;

        for (i = 0; i < data.length; i += 1) {
            regex = new RegExp(data[i].value, 'i');
            match = regex.test(agent);
            if (match) {
                regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                matches = agent.match(regexv);
                version = '';
                if (matches) {
                    if (matches[1]) {
                        matchString = matches[1];
                    }
                }
                if (matchString) {
                    matches = matchString.split(/[._]+/);
                    for (j = 0; j < matches.length; j += 1) {
                        if (j === 0) {
                            version += matches[j] + '.';
                        } else {
                            version += matches[j];
                        }
                    }
                } else {
                    version = '0';
                }
                return {
                    name: data[i].name,
                    version: parseFloat(version)
                };
            }
        }
        return { name: 'unknown', version: 0 };
    }
}