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
var animations_1 = require("@angular/animations");
var animations_2 = require("@angular/platform-browser/animations");
var user_service_1 = require("./_services/user.service");
var click_service_1 = require("./_services/click.service");
var authentication_service_1 = require("./_services/authentication.service");
var sentence_service_1 = require("./_services/sentence.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(userService, clickService, authenticationService, sentenceService) {
        var _this = this;
        this.userService = userService;
        this.clickService = clickService;
        this.authenticationService = authenticationService;
        this.sentenceService = sentenceService;
        this.menuState = 'in';
        this.archiveMenuState = 'in';
        this.currentUserName = "";
        this.random = 'in';
        this.clickService.archiveClick$.subscribe(function (value) {
            if (value == false) {
                _this.archiveMenuState = 'in';
            }
            else {
                _this.archiveMenuState = 'out';
            }
        });
        this.authenticationService.isLoggedIn$.subscribe(function (value) {
            if (value == true) {
                console.log("is logged in on true");
                _this.showNav = true;
            }
            else {
                console.log("is logged in on false");
                _this.showNav = false;
            }
        });
        this.userService.username$.subscribe(function (value) {
            _this.currentUserName = value;
        });
        this.clickService.bodyClick$.subscribe(function (value) {
            if (value == true) {
                _this.random = "out";
            }
            else {
                _this.random = "in";
            }
        });
    }
    __decorate([
        core_1.HostBinding('@hostAnimation'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "random", void 0);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: "app.component.html",
            styleUrls: ['./app.component.css'],
            providers: [
                http_1.HttpModule,
                animations_2.BrowserAnimationsModule
            ],
            animations: [
                animations_1.trigger('slideInOut', [
                    animations_1.state('in', animations_1.style({
                        width: '450px',
                        left: "-450px"
                    })),
                    animations_1.state('out', animations_1.style({
                        width: '450px',
                        left: "0"
                    })),
                    animations_1.transition('in => out', animations_1.animate('400ms ease-in-out')),
                    animations_1.transition('out => in', animations_1.animate('400ms ease-in-out'))
                ]),
                animations_1.trigger('archiveMenuSlideInOut', [
                    animations_1.state('in', animations_1.style({
                        transform: 'translate3d(100%, 0, 0)'
                    })),
                    animations_1.state('out', animations_1.style({
                        transform: 'translate3d(0,0,0)'
                    })),
                    animations_1.transition('in => out', animations_1.animate('400ms ease-in-out')),
                    animations_1.transition('out => in', animations_1.animate('400ms ease-in-out'))
                ]),
                animations_1.trigger('hostAnimation', [
                    animations_1.state('in', animations_1.style({
                        marginLeft: "0px"
                    })),
                    animations_1.state('out', animations_1.style({
                        marginLeft: "450px"
                    })),
                    animations_1.transition('in => out', animations_1.animate('400ms ease-in-out')),
                    animations_1.transition('out => in', animations_1.animate('400ms ease-in-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            click_service_1.ClickService,
            authentication_service_1.AuthenticationService,
            sentence_service_1.SentenceService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
;

//# sourceMappingURL=app.component.js.map
