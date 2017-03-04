"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
var userAuthent_component_1 = require("./userAuthent.component");
var profile_component_1 = require("./profile.component");
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'login', component: userAuthent_component_1.UserAuthentication },
    { path: 'profile', component: profile_component_1.Profile },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
exports.appRoutingProvider = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map