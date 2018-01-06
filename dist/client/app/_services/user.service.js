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
var Subject_1 = require("rxjs/Subject");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.username = new Subject_1.Subject();
        this.username$ = this.username.asObservable();
    }
    UserService.prototype.getAll = function () {
        return this.http.get('/api/getusers/', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        return this.http.post('/api/users/', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (userId) {
        return this.http.post('/api/byid', { id: userId }).map(function (response) { return response.json(); });
    };
    UserService.prototype.addUserToSession = function (data) {
        this.username.next(data);
    };
    UserService.prototype.getUserFiles = function (userId) {
        return this.http.post('/api/getuserfiles', { userId: userId }).map(function (response) { return response.json(); });
    };
    UserService.prototype.getAllUserFiles = function (userId) {
        return this.http.post('/api/getalluserfiles', { userId: userId }).map(function (response) { return response.json(); });
    };
    UserService.prototype.getUserLastFile = function (userId) {
        return this.http.post('/api/getlastfile', { userId: userId }).map(function (response) { return response.json(); });
    };
    UserService.prototype.addUserLastFile = function (userId, lastFile) {
        return this.http.post('/api/addlastfile', { userId: userId, lastFile: lastFile }).map(function (response) {
            response.json();
            console.log(response.json());
        });
    };
    UserService.prototype.archiveUserFile = function (userId, filename, content) {
        return this.http.post('/api/savearchive', { userId: userId, filename: filename, content: content }).map(function (response) { return response.json(); });
    };
    UserService.prototype.getArchiveFiles = function (userId) {
        return this.http.post('/api/getuserarchives', { userId: userId }).map(function (response) { return response.json(); });
    };
    UserService.prototype.getAllArchiveFiles = function (userId) {
        return this.http.post('/api/getalluserarchives', { userId: userId }).map(function (response) { return response.json(); });
    };
    UserService.prototype.downloadArchive = function (fileName) {
        return this.http.post('/api/download', { fileName: fileName }).map(function (response) { return response; });
    };
    UserService.prototype.jwt = function () {
        var token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;

//# sourceMappingURL=user.service.js.map
