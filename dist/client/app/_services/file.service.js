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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fc2VydmljZXMvZmlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUE4RDtBQUM5RCw4Q0FBNkM7QUFDN0MsaUNBQStCO0FBQy9CLG1DQUFpQztBQUNqQyx3Q0FBdUM7QUFFdkMsMERBQXdEO0FBR3hEO0lBS0kscUJBQ1ksSUFBVSxFQUNWLFdBQXdCO1FBRHhCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQU41QixZQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFVLENBQUM7UUFDeEMsYUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkMsYUFBUSxHQUFHLGFBQWEsQ0FBQztJQUlyQixDQUFDO0lBQ0wsNEJBQU0sR0FBTixVQUFPLEtBQUssRUFBRSxVQUFVO1FBQ3BCLElBQUksT0FBTyxHQUFZLElBQUksY0FBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLEdBQW1CLElBQUkscUJBQWMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztRQUM5RCxPQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDL0MsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQzthQUNoQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFBO0lBRWhELENBQUM7SUFDRCxvQ0FBYyxHQUFkLFVBQWUsR0FBVztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE1QlEsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQU9TLFdBQUk7WUFDRywwQkFBVztPQVAzQixXQUFXLENBOEJ2QjtJQUFELGtCQUFDO0NBOUJELEFBOEJDLElBQUE7QUE5Qlksa0NBQVciLCJmaWxlIjoiYXBwL19zZXJ2aWNlcy9maWxlLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2NhdGNoXCI7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anMvU3ViamVjdFwiO1xuaW1wb3J0IGRlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL19zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpbGVTZXJ2aWNle1xuICAgIHByaXZhdGUgZmlsZVNyYyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBmaWxlU3JjJCA9IHRoaXMuZmlsZVNyYy5hc09ic2VydmFibGUoKTtcblxuICAgIF9iYXNlVXJsID0gXCIvYXBpL3VwbG9hZFwiO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHAsXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlXG4gICAgKSB7IH1cbiAgICB1cGxvYWQoZmlsZXMsIHBhcmFtZXRlcnMpe1xuICAgICAgICBsZXQgaGVhZGVyczogSGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIGxldCBvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7aGVhZGVyczogaGVhZGVyc30pO1xuICAgICAgICBsZXQgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSBwYXJhbWV0ZXJzO1xuICAgICAgICBjb25zb2xlLmxvZyhvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuX2Jhc2VVcmwsIGZpbGVzLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcikpXG5cbiAgICB9XG4gICAgdXBsb2FkRnJvbVNpZGUoc3JjOiBzdHJpbmcpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyB1cGxvYWQgc3JjIC0+IFwiLCBzcmMpO1xuICAgICAgICB0aGlzLmZpbGVTcmMubmV4dChzcmMpO1xuICAgICAgICB2YXIgaWQ6IHN0cmluZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuYWRkVXNlckxhc3RGaWxlKGlkLCBzcmMpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFzdCBmaWxlIGFkZGluZyBjb3JyZWN0IVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
