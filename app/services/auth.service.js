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
var angular2_jwt_1 = require("angular2-jwt");
var httpService_1 = require("./httpService");
var Auth = (function () {
    function Auth(httpService) {
        var _this = this;
        this.httpService = httpService;
        // Configure Auth0
        this.lock = new Auth0Lock('kiFEDR9RJ4dos13YxmGDGz8Q7xVmHbwx', 'tahahassan.eu.auth0.com', {});
        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        // Add callback for the Lock `authenticated` event
        this.lock.on("authenticated", function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            // Fetch profile information
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }
                localStorage.setItem('profile', JSON.stringify(profile));
                _this.userProfile = profile;
                localStorage.setItem('email', profile.email);
                // Getting the user Informaion from local databse. If not found in databse, new entry will be added to database
                _this.httpService.getData('http://localhost:3500/user?email=' + profile.email).subscribe(function (data) {
                    if (data.length === 0) {
                        _this.httpService.setData('http://localhost:3500/user', { 'username': profile.name, 'email': profile.email, 'clicked': 0 }).subscribe(function (data) {
                        }, function (error) { return console.log(error); });
                    }
                }, function (error) { return console.log(error); });
            });
        });
    }
    Auth.prototype.login = function () {
        // Call the show method to display the widget.
        this.lock.show();
    };
    Auth.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return angular2_jwt_1.tokenNotExpired();
    };
    Auth.prototype.logout = function () {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
    };
    return Auth;
}());
Auth = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [httpService_1.HttpService])
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map