"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var category_1 = require("./../models/category");
var product_1 = require("./../models/product");
var order_1 = require("./../models/order");
var myGlobals = require("./../globals");
var APIService = (function () {
    function APIService(http, router) {
        this.http = http;
        this.router = router;
        // Define the routes we are going to interact with
        this.apiUrl = myGlobals.apiUrl;
        this.categories = [];
        this.products = [];
        this.orders = [];
    }
    APIService.prototype.getCategoryName = function (catId) {
        if (this.categories.length == 0) {
            this.router.navigate(['/selection']);
            return null;
        }
        else {
            var catName_1 = "";
            this.categories.forEach(function (elem) {
                if (elem.id == catId) {
                    catName_1 = elem.name;
                }
            });
            return catName_1;
        }
    };
    APIService.prototype.getCategories = function () {
        var _this = this;
        if (this.categories.length == 0) {
            this.getAPICategories().subscribe(function (categories) {
                for (var i = 0; i < categories.length; i++) {
                    var category = new category_1.Category();
                    category = JSON.parse(String(categories[i]));
                    _this.categories.push(category);
                }
            }, function (error) { return error; });
        }
        return this.categories;
    };
    APIService.prototype.getProduct = function (prodId) {
        if (this.products.length == 0) {
            this.router.navigate(['/selection']);
            return null;
        }
        else {
            var product_2;
            this.products.forEach(function (elem) {
                if (elem.id == prodId) {
                    product_2 = elem;
                }
            });
            return product_2;
        }
    };
    APIService.prototype.getProducts = function () {
        var _this = this;
        if (this.products.length == 0) {
            this.getAPIProducts().subscribe(function (products) {
                for (var i = 0; i < products.length; i++) {
                    var product = new product_1.Product();
                    product = JSON.parse(String(products[i]));
                    _this.products.push(product);
                }
            }, function (error) { return error; });
        }
        return this.products;
    };
    APIService.prototype.getOrders = function () {
        var _this = this;
        if (this.orders.length == 0) {
            this.getAPIOrders().subscribe(function (orders) {
                for (var i = 0; i < orders.length; i++) {
                    var order = new order_1.Order();
                    order = JSON.parse(String(orders[i]));
                    _this.orders.push(order);
                }
            }, function (error) { return error; });
        }
        return this.orders;
    };
    APIService.prototype.updateShoppingCartOrders = function () {
        if (this.orders.length > 0) {
            for (var i = 0; i < this.orders.length; i++) {
                var order = this.orders[i];
                if (order.is_ordered == false && order.is_canceled == false) {
                    this.orders[i].is_ordered = true;
                }
            }
        }
    };
    APIService.prototype.getShoppingCartOrders = function () {
        var orders = [];
        if (this.orders.length > 0) {
            for (var i = 0; i < this.orders.length; i++) {
                var order = this.orders[i];
                // Wenn die Produkte noch nicht bestellt sind
                if (order.is_ordered == false && order.is_canceled == false) {
                    orders.push(order);
                }
            }
        }
        return orders;
    };
    APIService.prototype.getBillOrders = function () {
        var orders = [];
        if (this.orders.length > 0) {
            for (var i = 0; i < this.orders.length; i++) {
                var order = this.orders[i];
                // Wenn die Produkte bereits bestellt sind
                if (order.is_ordered == true && order.is_canceled == false) {
                    orders.push(order);
                }
            }
        }
        return orders;
    };
    APIService.prototype.getShoppingCartCount = function () {
        if (this.orders.length > 0) {
            var count = 0;
            for (var i = 0; i < this.orders.length; i++) {
                var order = this.orders[i];
                if (order.is_ordered == false && order.is_canceled == false) {
                    count++;
                }
            }
            return count;
        }
        else {
            return 0;
        }
    };
    APIService.prototype.buyAPIProduct = function (prodId, amount, notice) {
        var apiToken = myGlobals.apiToken;
        var customerToken = localStorage.getItem("auth_token");
        var smartPhoneDetails = this.getBrowser();
        var body = JSON.stringify({
            api_token: apiToken,
            customer_token: customerToken,
            prod_id: prodId,
            sp_details: smartPhoneDetails,
            amount: amount,
            notice: notice
        });
        var product = null;
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == prodId) {
                product = this.products[i];
                break;
            }
        }
        var order = new order_1.Order();
        order.id = this.getRandomInt(10, 100);
        order.product = product;
        order.amount = amount;
        order.is_ordered = false;
        order.is_canceled = false;
        order.is_ready = false;
        this.orders.push(order);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var apiUrl = myGlobals.apiUrl + '/buyProduct';
        return this.http
            .post(apiUrl, body, options)
            .map(this.extractDataWithMessage)
            .catch(this.handleError);
    };
    APIService.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    APIService.prototype.getAPICategories = function () {
        return this.http.get(this.apiUrl + '/getCategories')
            .map(this.extractData)
            .catch(this.handleError);
    };
    APIService.prototype.getAPIProducts = function () {
        return this.http.get(this.apiUrl + '/getProducts')
            .map(this.extractData)
            .catch(this.handleError);
    };
    APIService.prototype.getAPIOrders = function () {
        var apiToken = myGlobals.apiToken;
        var customerToken = localStorage.getItem("auth_token");
        var body = JSON.stringify({
            api_token: apiToken,
            customer_token: customerToken
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var apiUrl = myGlobals.apiUrl + '/getOrders';
        return this.http
            .post(apiUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    APIService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    APIService.prototype.extractDataWithMessage = function (res) {
        var body = res.json();
        var ret = {
            "success": body.success,
            "message": body.message
        };
        return ret;
    };
    APIService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    APIService.prototype.getBrowser = function () {
        var dataos = [
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
        var databrowser = [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ];
        var os = this.matchItem(dataos), browser = this.matchItem(databrowser);
        return { os: os, browser: browser };
    };
    APIService.prototype.matchItem = function (data) {
        // The common (as any) style type assertion is a quickfix
        var agent = window.navigator.platform + " " + window.navigator.userAgent + " " + window.navigator.appVersion
            + " " + window.navigator.vendor + " " + window.opera;
        var i = 0, j = 0, regex, regexv, match, matches, matchString, version;
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
                        }
                        else {
                            version += matches[j];
                        }
                    }
                }
                else {
                    version = '0';
                }
                return {
                    name: data[i].name,
                    version: parseFloat(version)
                };
            }
        }
        return { name: 'unknown', version: 0 };
    };
    return APIService;
}());
APIService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], APIService);
exports.APIService = APIService;
//# sourceMappingURL=api.service.js.map