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
var animations_1 = require("@angular/animations");
var click_service_1 = require("../_services/click.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(clickService) {
        var _this = this;
        this.clickService = clickService;
        this.menuState = 'in';
        this.saveFileActive = false;
        this.saveFileAlert = false;
        this.confirmationActive = false;
        this.clickService.saveFile$.subscribe(function (value) {
            _this.saveFileActive = value;
        });
        this.clickService.sideMenu$.subscribe(function (value) {
            _this.menuState = value;
        });
        this.clickService.alertBox$.subscribe(function (value) {
            _this.saveFileAlert = value;
        });
        this.clickService.archiveConfirmation$.subscribe(function (value) {
            console.log("confirmationActive state -> ", value);
            _this.confirmationActive = value;
        });
    }
    DashboardComponent.prototype.ngOnInit = function () { };
    DashboardComponent.prototype.toggleMenu = function () {
        console.log("this.menuState", this.menuState);
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
        this.clickService.moveBody();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css'],
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
                ])
            ]
        }),
        __metadata("design:paramtypes", [click_service_1.ClickService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=dashboard.component.js.map
