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
var httpService_1 = require("./services/httpService");
var router_1 = require("@angular/router");
var HomeComponent = (function () {
    function HomeComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.clickURL = 'http://localhost:3500/click';
    }
    HomeComponent.prototype.updateClick = function () {
        var _this = this;
        var url = this.clickURL + '/' + this._id;
        var newClick = this.clicked + 1;
        var obj = { click: newClick };
        console.log(obj);
        this.httpService.updateData(url, obj).subscribe(function (data) {
            _this.clicked = newClick;
        });
    };
    HomeComponent.prototype.redirect = function (pagename) {
        this.router.navigate(['/' + pagename]);
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Starting');
        this.httpService.getData(this.clickURL).subscribe(function (data) {
            _this.clicked = data[0].click;
            _this._id = data[0]._id;
            console.log(_this._id);
        }, function (error) { return console.log(error); });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home',
        templateUrl: 'home.component.html',
    }),
    __metadata("design:paramtypes", [httpService_1.HttpService, router_1.Router])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map