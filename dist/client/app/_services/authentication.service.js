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
var Subject_1 = require("rxjs/Subject");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.isLoggedIn = new Subject_1.Subject();
        this.isLoggedIn$ = this.isLoggedIn.asObservable();
    }
    AuthenticationService.prototype.createHeaders = function (headers) {
        headers.append('Content-Type', 'application/json');
    };
    AuthenticationService.prototype.login = function (username, password) {
        console.log(username, password);
        var headers = new http_1.Headers();
        this.createHeaders(headers);
        return this.http.post('/auth/login', JSON.stringify({
            username: username,
            password: password
        }), { headers: headers }).map(function (response) {
            console.log(response.json());
            var token = response.json().token;
            var id = response.json().id;
            var firstname = response.json().firstname;
            var lastname = response.json().lastname;
            if (id) {
                localStorage.setItem('user', JSON.stringify(id));
                console.log(JSON.parse(localStorage.getItem('user')));
            }
            if (token) {
                localStorage.setItem('token', JSON.stringify(token));
                console.log(JSON.parse(localStorage.getItem('token')));
            }
            if (firstname) {
                localStorage.setItem('firstname', JSON.stringify(firstname));
            }
            if (lastname) {
                localStorage.setItem('lastname', JSON.stringify(lastname));
            }
            return response.json();
        });
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        var token = localStorage.getItem('token');
        //console.log("This is the token -> ", JSON.parse(token));
        if (token) {
            this.isLoggedIn.next(true);
            return true;
        }
        else {
            this.isLoggedIn.next(false);
            return false;
        }
    };
    AuthenticationService.prototype.destroySession = function () {
        this.isLoggedIn.next(false);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;

//# sourceMappingURL=authentication.service.js.map
