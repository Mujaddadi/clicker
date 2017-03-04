"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home.component");
var profile_component_1 = require("./profile.component");
var userAuthent_component_1 = require("./userAuthent.component");
var app_routes_1 = require("./app.routes");
var auth_service_1 = require("./services/auth.service");
var httpService_1 = require("./services/httpService");
var auth_guard_1 = require("./auth.guard");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routes_1.routing],
        declarations: [app_component_1.AppComponent, userAuthent_component_1.UserAuthentication, home_component_1.HomeComponent, profile_component_1.Profile],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            httpService_1.HttpService,
            app_routes_1.appRoutingProvider,
            angular2_jwt_1.AUTH_PROVIDERS,
            auth_service_1.Auth,
            auth_guard_1.AuthGuard
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map