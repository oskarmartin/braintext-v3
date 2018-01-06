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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var Subject_1 = require("rxjs/Subject");
var user_service_1 = require("../_services/user.service");
var FileService = /** @class */ (function () {
    function FileService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.fileSrc = new Subject_1.Subject();
        this.fileSrc$ = this.fileSrc.asObservable();
        this._baseUrl = "/api/upload";
    }
    FileService.prototype.upload = function (files, parameters) {
        var headers = new http_1.Headers();
        var options = new http_1.RequestOptions({ headers: headers });
        var token = localStorage.getItem('token');
        headers.append('Accept', 'application/x-www-form-urlencoded');
        options.params = parameters;
        console.log(options);
        return this.http.post(this._baseUrl, files, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    FileService.prototype.uploadFromSide = function (src) {
        console.log("new upload src -> ", src);
        this.fileSrc.next(src);
        var id = JSON.parse(localStorage.getItem('user'));
        this.userService.addUserLastFile(id, src).subscribe(function (data) {
            console.log("last file adding correct!");
        });
    };
    FileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            user_service_1.UserService])
    ], FileService);
    return FileService;
}());
exports.FileService = FileService;

//# sourceMappingURL=file.service.js.map
