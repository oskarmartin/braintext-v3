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

//# sourceMappingURL=login.component.js.map
