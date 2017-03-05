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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    } // Instantiate the Http service
    // Fucntion to get the data
    HttpService.prototype.getData = function (_productUrl) {
        console.log(_productUrl);
        console.log("Running get Data Service");
        return this
            .http
            .get(_productUrl)
            .map(function (res) { return res.json(); });
    };
    // Function to insert the data
    HttpService.prototype.setData = function (_productUrl, newObject) {
        console.log("Running set Data Service");
        console.log(_productUrl);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        var objectString = JSON.stringify(newObject); // Stringify payload
        return this
            .http
            .post(_productUrl, objectString, options)
            .map(function (res) { return res.json(); });
    };
    // Function to update the data
    HttpService.prototype.updateData = function (_productUrl, updateobject) {
        console.log("Running update Data Service");
        // console.log("The product URL received is " + _productUrl);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        var objectString = JSON.stringify(updateobject); // Stringify payload
        return this
            .http
            .put(_productUrl, objectString, options)
            .map(function (res) { return res.json(); });
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=httpService.js.map