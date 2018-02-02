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
        return this.http.post('/api/download', { fileName: fileName }).map(function (response) { return response.blob(); });
    };
    UserService.prototype.downloadTest = function () {
        return this.http.get('/api/test', this.jwt()).map(function (response) {
            response.json();
        });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUV4RSx3Q0FBdUM7QUFJdkM7SUFJSSxxQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFIdEIsYUFBUSxHQUFHLElBQUksaUJBQU8sRUFBVSxDQUFDO1FBQ3pDLGNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRVAsQ0FBQztJQUVuQyw0QkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQWtCLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUNELDRCQUFNLEdBQU4sVUFBTyxJQUFVO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFrQixJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFDRCw2QkFBTyxHQUFQLFVBQVEsTUFBYztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBQ0Qsc0NBQWdCLEdBQWhCLFVBQWlCLElBQVk7UUFDekIsSUFBSSxDQUFDLFFB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Q0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQWtCO1lBQ2pFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTyx5QkFBRyxHQUFYO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFdEQsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQztZQUNOLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0wsQ0FBQztJQXpEUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBS2lCLFdBQUk7T0FKckIsV0FBVyxDQTBEdkI7SUFBRCxrQkFBQztDQTFERCxBQTBEQyxJQUFBO0FBMURZLGtDQUFXIiwiZmlsZSI6ImFwcC9fc2VydmljZXMvdXNlci5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgUmVzcG9uc2VDb250ZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzL1N1YmplY3RcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vX21vZGVscy91c2VyXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZXtcbiAgICBwcml2YXRlIHVzZXJuYW1lID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHVzZXJuYW1lJCA9IHRoaXMudXNlcm5hbWUuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuXG4gICAgZ2V0QWxsKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCcvYXBpL2dldHVzZXJzLycsIHRoaXMuand0KCkpLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cbiAgICBjcmVhdGUodXNlcjogVXNlcil7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS91c2Vycy8nLCB0aGlzLmp3dCgpKS5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICB9XG4gICAgZ2V0QnlJZCh1c2VySWQ6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9ieWlkJywge2lkOiB1c2VySWR9KS5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICB9XG4gICAgYWRkVXNlclRvU2Vzc2lvbihkYXRhOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLnVzZXJuYW1lLm5leHQoZGF0YSk7XG4gICAgfVxuICAgIGdldFVzZXJGaWxlcyh1c2VySWQ6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9nZXR1c2VyZmlsZXMnLCB7dXNlcklkfSkubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfVxuICAgIGdldEFsbFVzZXJGaWxlcyh1c2VySWQ6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9nZXRhbGx1c2VyZmlsZXMnLCB7dXNlcklkfSkubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfVxuICAgIGdldFVzZXJMYXN0RmlsZSh1c2VySWQ6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9nZXRsYXN0ZmlsZScsIHt1c2VySWR9KS5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICB9XG4gICAgYWRkVXNlckxhc3RGaWxlKHVzZXJJZDogc3RyaW5nLCBsYXN0RmlsZTogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL2FkZGxhc3RmaWxlJywge3VzZXJJZCwgbGFzdEZpbGV9KS5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT57XG4gICAgICAgICAgICByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5qc29uKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXJjaGl2ZVVzZXJGaWxlKHVzZXJJZDogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpe1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9hcGkvc2F2ZWFyY2hpdmUnLCB7dXNlcklkLCBmaWxlbmFtZSwgY29udGVudH0pLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cbiAgICBnZXRBcmNoaXZlRmlsZXModXNlcklkOiBzdHJpbmcpe1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9hcGkvZ2V0dXNlcmFyY2hpdmVzJywge3VzZXJJZH0pLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cbiAgICBnZXRBbGxBcmNoaXZlRmlsZXModXNlcklkOiBzdHJpbmcpe1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9hcGkvZ2V0YWxsdXNlcmFyY2hpdmVzJywge3VzZXJJZH0pLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cbiAgICBkb3dubG9hZEFyY2hpdmUoZmlsZU5hbWU6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9kb3dubG9hZCcsIHtmaWxlTmFtZX0pLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5ibG9iKCkpO1xuICAgIH1cbiAgICBkb3dubG9hZFRlc3QoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy9hcGkvdGVzdCcsIHRoaXMuand0KCkpLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHByaXZhdGUgand0KCl7XG4gICAgICAgIGxldCB0b2tlbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykpO1xuXG4gICAgICAgIGlmKHRva2VuKXtcbiAgICAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW59KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
