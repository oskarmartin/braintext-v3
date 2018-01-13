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
var authService = /** @class */ (function () {
    function authService(http) {
        this.http = http;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    authService.prototype.testing = function (username, password) {
        console.log("initiated");
        return "sain info kätte";
    };
    authService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('/auth/login', JSON.stringify({ username: username, password: password }))
            .map(function (response) {
            console.log("This is the response", response);
            var token = response.json() && response.json().token;
            if (token) {
                _this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                return true;
            }
            else {
                return false;
            }
        });
    };
    authService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], authService);
    return authService;
}());
exports.authService = authService;

//# sourceMappingURL=authentication.service.js.map
