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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QkFBQztDQTNDRCxBQTJDQyxJQUFBO0FBM0NZLG9DQUFZO0FBMkN4QixDQUFDIiwiZmlsZSI6ImFwcC9hcHAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSG9zdExpc3RlbmVyLCBIb3N0QmluZGluZyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBhdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9fc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrU2VydmljZSB9IGZyb20gJy4vX3NlcnZpY2VzL2NsaWNrLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9fc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTZW50ZW5jZVNlcnZpY2UgfSBmcm9tICcuL19zZXJ2aWNlcy9zZW50ZW5jZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwLmNvbXBvbmVudC5jc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSHR0cE1vZHVsZSxcbiAgICAgICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcbiAgICBdLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcbiAgICAgICAgICAgIHN0YXRlKCdpbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgICAgICBsZWZ0OiBcIi00NTBweFwiXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnb3V0Jywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnNDUwcHgnLFxuICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdpbiA9PiBvdXQnLCBhbmltYXRlKCc0MDBtcyBlYXNlLWluLW91dCcpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ291dCA9PiBpbicsIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0JykpXG4gICAgICAgIF0pLFxuICAgICAgICB0cmlnZ2VyKCdhcmNoaXZlTWVudVNsaWRlSW5PdXQnLCBbXG4gICAgICAgICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwJSwgMCwgMCknXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnb3V0Jywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsMCwwKSdcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ2luID0+IG91dCcsIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignb3V0ID0+IGluJywgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKSlcbiAgICAgICAgXSksXG4gICAgICAgIHRyaWdnZXIoJ2hvc3RBbmltYXRpb24nLCBbXG4gICAgICAgICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogXCIwcHhcIlxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ291dCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiBcIjQ1MHB4XCJcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ2luID0+IG91dCcsIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignb3V0ID0+IGluJywgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudHtcblxuICAgIG1lbnVTdGF0ZTpzdHJpbmcgPSAnaW4nO1xuICAgIGFyY2hpdmVNZW51U3RhdGU6IHN0cmluZyA9ICdpbic7XG4gICAgY3VycmVudFVzZXJOYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIHNob3dOYXY6IGJvb2xlYW47XG5cbiAgICBASG9zdEJpbmRpbmcoJ0Bob3N0QW5pbWF0aW9uJykgcmFuZG9tID0gJ2luJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjbGlja1NlcnZpY2U6IENsaWNrU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzZW50ZW5jZVNlcnZpY2U6IFNlbnRlbmNlU2VydmljZVxuICAgICl7XG4gICAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLmFyY2hpdmVDbGljayQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmKHZhbHVlID09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFyY2hpdmVNZW51U3RhdGUgPSAnaW4nO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmNoaXZlTWVudVN0YXRlID0gJ291dCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmlzTG9nZ2VkSW4kLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZih2YWx1ZSA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIGxvZ2dlZCBpbiBvbiB0cnVlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdiA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIGxvZ2dlZCBpbiBvbiBmYWxzZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOYXYgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS51c2VybmFtZSQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXJOYW1lID0gdmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLmJvZHlDbGljayQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmKHZhbHVlID09IHRydWUpe1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZG9tID0gXCJvdXRcIjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZG9tID0gXCJpblwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxufTtcbiJdfQ==
