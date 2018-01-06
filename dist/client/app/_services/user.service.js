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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUN4RSx3Q0FBdUM7QUFJdkM7SUFJSSxxQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFIdEIsYUFBUSxHQUFHLElBQUksaUJBQU8sRUFBVSxDQUFDO1FBQ3pDLGNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRVAsQ0FBQztJQUVuQyw0QkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQWtCLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUNELDRCQUFNLEdBQU4sVUFBTyxJQUFVO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFrQixJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFDRCw2QkFBTyxHQUFQLFVBQVEsTUFBYztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBQ0Qsc0NBQWdCLEdBQWhCLFVBQWlCLElBQVk7UUFDekIsSUFBSSxDQUFDLFFB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Q0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUV0RCxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQ04sSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUM7SUFDTCxDQUFDO0lBcERRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FLaUIsV0FBSTtPQUpyQixXQUFXLENBcUR2QjtJQUFELGtCQUFDO0NBckRELEFBcURDLElBQUE7QUFyRFksa0NBQVciLCJmaWxlIjoiYXBwL19zZXJ2aWNlcy91c2VyLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anMvU3ViamVjdFwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9fbW9kZWxzL3VzZXJcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNle1xuICAgIHByaXZhdGUgdXNlcm5hbWUgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgdXNlcm5hbWUkID0gdGhpcy51c2VybmFtZS5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG5cbiAgICBnZXRBbGwoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy9hcGkvZ2V0dXNlcnMvJywgdGhpcy5qd3QoKSkubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfVxuICAgIGNyZWF0ZSh1c2VyOiBVc2VyKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL3VzZXJzLycsIHRoaXMuand0KCkpLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cbiAgICBnZXRCeUlkKHVzZXJJZDogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL2J5aWQnLCB7aWQ6IHVzZXJJZH0pLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cbiAgICBhZGRVc2VyVG9TZXNzaW9uKGRhdGE6IHN0cmluZyl7XG4gICAgICAgIHRoaXMudXNlcm5hbWUubmV4dChkYXRhKTtcbiAgICB9XG4gICAgZ2V0VXNlckZpbGVzKHVzZXJJZDogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL2dldHVzZXJmaWxlcycsIHt1c2VySWR9KS5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICB9XG4gICAgZ2V0QWxsVXNlckZpbGVzKHVzZXJJZDogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL2dldGFsbHVzZXJmaWxlcycsIHt1c2VySWR9KS5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICB9XG4gICAgZ2V0VXNlckxhc3RGaWxlKHVzZXJJZDogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL2dldGxhc3RmaWxlJywge3VzZXJJZH0pLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cbiAgICBhZGRVc2VyTGFzdEZpbGUodXNlcklkOiBzdHJpbmcsIGxhc3RGaWxlOiBzdHJpbmcpe1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9hcGkvYWRkbGFzdGZpbGUnLCB7dXNlcklkLCBsYXN0RmlsZX0pLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PntcbiAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmpzb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhcmNoaXZlVXNlckZpbGUodXNlcklkOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9zYXZlYXJjaGl2ZScsIHt1c2VySWQsIGZpbGVuYW1lLCBjb250ZW50fSkubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfVxuICAgIGdldEFyY2hpdmVGaWxlcyh1c2VySWQ6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9nZXR1c2VyYXJjaGl2ZXMnLCB7dXNlcklkfSkubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfVxuICAgIGdldEFsbEFyY2hpdmVGaWxlcyh1c2VySWQ6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9nZXRhbGx1c2VyYXJjaGl2ZXMnLCB7dXNlcklkfSkubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfVxuICAgIGRvd25sb2FkQXJjaGl2ZShmaWxlTmFtZTogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL2Rvd25sb2FkJywge2ZpbGVOYW1lfSkubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBqd3QoKXtcbiAgICAgICAgbGV0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSk7XG5cbiAgICAgICAgaWYodG9rZW4pe1xuICAgICAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlbn0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
