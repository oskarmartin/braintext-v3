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
var http_2 = require("@angular/http");
var user_service_1 = require("../_services/user.service");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(userService, http) {
        this.userService = userService;
        this.http = http;
        this.users = [];
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
    };
    AdminComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll()
            .subscribe(function (data) { return _this.users = data; });
    };
    AdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'admin.component.html',
            providers: [http_1.HttpModule]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, http_2.Http])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hZG1pbi9hZG1pbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0NBQTJDO0FBQzNDLHNDQUFxQztBQUdyQywwREFBd0Q7QUFReEQ7SUFJSSx3QkFBb0IsV0FBd0IsRUFBVSxJQUFVO1FBQTVDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZoRSxVQUFLLEdBQVcsRUFBRSxDQUFDO0lBSW5CLENBQUM7SUFDRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDTyxxQ0FBWSxHQUFwQjtRQUFBLGlCQUdDO1FBRkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7YUFDcEIsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQWpCLENBQWlCLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBYlEsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsU0FBUyxFQUFFLENBQUUsaUJBQVUsQ0FBRTtTQUM1QixDQUFDO3lDQU1tQywwQkFBVyxFQUFnQixXQUFJO09BSnZELGNBQWMsQ0FlMUI7SUFBRCxxQkFBQztDQWZELEFBZUMsSUFBQTtBQWZZLHdDQUFjIiwiZmlsZSI6ImFwcC9hZG1pbi9hZG1pbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IEh0dHAgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL19tb2RlbHMvdXNlclwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9fc2VydmljZXMvdXNlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJ2FkbWluLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFsgSHR0cE1vZHVsZSBdXG59KVxuXG5leHBvcnQgY2xhc3MgQWRtaW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgY3VycmVudFVzZXI6IFVzZXI7XG4gICAgdXNlcnM6IFVzZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cCl7XG5cbiAgICB9XG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgdGhpcy5sb2FkQWxsVXNlcnMoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkQWxsVXNlcnMoKXtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5nZXRBbGwoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHRoaXMudXNlcnMgPSBkYXRhKVxuICAgIH1cblxufVxuIl19
