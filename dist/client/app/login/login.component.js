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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var alert_service_1 = require("../_services/alert.service");
var authentication_service_1 = require("../_services/authentication.service");
var user_service_1 = require("../_services/user.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, router, authenticationService, alertService, userService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.userService = userService;
        this.model = {};
        this.loading = false;
        this.errorMsg = null;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.authenticationService.logout();
        this.authenticationService.destroySession();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (data) {
            console.log(data);
            _this.router.navigate(['/dashboard']);
        }, function (error) {
            _this.errorMsg = error.json().err;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "login.component.html",
            providers: [http_1.HttpModule]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            authentication_service_1.AuthenticationService,
            alert_service_1.AlertService,
            user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlEO0FBQ3pELHNDQUEyQztBQUUzQyw0REFBMEQ7QUFDMUQsOEVBQTRFO0FBQzVFLDBEQUF3RDtBQVF4RDtJQU1JLHdCQUNZLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxxQkFBNEMsRUFDNUMsWUFBMEIsRUFDMUIsV0FBd0I7UUFKeEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWcEMsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLGFBQVEsR0FBVyxJQUFJLENBQUM7SUFRcEIsQ0FBQztJQUNMLGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFDRCw4QkFBSyxHQUFMO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ3JFLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQTNCUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxTQUFTLEVBQUUsQ0FBRSxpQkFBVSxDQUFFO1NBQzVCLENBQUM7eUNBU3FCLHVCQUFjO1lBQ2IsZUFBTTtZQUNTLDhDQUFxQjtZQUM5Qiw0QkFBWTtZQUNiLDBCQUFXO09BWDNCLGNBQWMsQ0E0QjFCO0lBQUQscUJBQUM7Q0E1QkQsQUE0QkMsSUFBQTtBQTVCWSx3Q0FBYyIsImZpbGUiOiJhcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5pbXBvcnQgeyBBbGVydFNlcnZpY2UgfSBmcm9tIFwiLi4vX3NlcnZpY2VzL2FsZXJ0LnNlcnZpY2VcIjtcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi9fc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vX3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImxvZ2luLmNvbXBvbmVudC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbIEh0dHBNb2R1bGUgXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIG1vZGVsOiBhbnkgPSB7fTtcbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcmV0dXJuVXJsOiBzdHJpbmc7XG4gICAgZXJyb3JNc2c6IHN0cmluZyA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlXG4gICAgKSB7IH1cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuZGVzdHJveVNlc3Npb24oKTtcbiAgICB9XG4gICAgbG9naW4oKXtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UubG9naW4odGhpcy5tb2RlbC51c2VybmFtZSwgdGhpcy5tb2RlbC5wYXNzd29yZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSAgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yLmpzb24oKS5lcnI7XG4gICAgICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==
