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
var user_service_1 = require("../_services/user.service");
var file_service_1 = require("../_services/file.service");
var animations_1 = require("@angular/animations");
var click_service_1 = require("../_services/click.service");
var SidemenuComponent = /** @class */ (function () {
    function SidemenuComponent(elementRef, userService, fileService, clickService, router) {
        this.elementRef = elementRef;
        this.userService = userService;
        this.fileService = fileService;
        this.clickService = clickService;
        this.router = router;
        this.nameArray = [];
        this.archiveArray = [];
        this.sourceFiles = false;
        this.navMenu = true;
        this.bindingVar = "";
        this.archiveFiles = false;
        this.currentDate = new Date();
        this.offClick = new core_1.EventEmitter();
    }
    SidemenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = JSON.parse(localStorage.getItem('user'));
        console.log(this.userService.getUserFiles(id));
        this.userService.getUserFiles(id).subscribe(function (data) {
            console.log("this is the data");
            _this.nameArray = data;
            console.log(_this.nameArray);
        });
        this.userService.getArchiveFiles(id).subscribe(function (data) {
            _this.archiveArray = data;
        });
    };
    SidemenuComponent.prototype.closeSideMenu = function () {
        this.offClick.emit("close");
    };
    SidemenuComponent.prototype.showSource = function () {
        this.navMenu = false;
        this.sourceFiles = true;
    };
    SidemenuComponent.prototype.showArchive = function () {
        this.navMenu = false;
        this.archiveFiles = true;
    };
    SidemenuComponent.prototype.onFileChange = function (event) {
        var files = event.target.files;
        this.saveFiles(files);
    };
    SidemenuComponent.prototype.changeNavigation = function (url) {
        this.router.navigate(['/dashboard/' + url]);
        this.clickService.closeSideMenu();
        this.clickService.moveBody();
    };
    SidemenuComponent.prototype.openHome = function () {
        this.router.navigate(['/dashboard']);
    };
    SidemenuComponent.prototype.navigationBack = function (from) {
        if (from === "source") {
            this.sourceFiles = false;
            this.navMenu = true;
        }
        if (from === "archive") {
            this.archiveFiles = false;
            this.navMenu = true;
        }
    };
    SidemenuComponent.prototype.saveFiles = function (files) {
        var _this = this;
        if (files.length > 0) {
            var formData = new FormData();
            formData.append("file", files[0], files[0].name);
            var parameters = {
                userId: JSON.parse(localStorage.getItem('user'))
            };
            this.fileService.upload(formData, parameters).subscribe(function (data) {
                _this.fileService.uploadFromSide(data.filename);
            }, function (error) {
                console.log("there was an error with upload");
            });
        }
    };
    SidemenuComponent.prototype.openFromSideMenu = function (src) {
        this.fileService.uploadFromSide(src);
        this.router.navigate(['/dashboard']);
        this.clickService.closeSideMenu();
        this.clickService.moveBody();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SidemenuComponent.prototype, "offClick", void 0);
    SidemenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "side-menu.component.html",
            styleUrls: ['./side-menu.component.css'],
            selector: "side-menu",
            animations: [
                animations_1.trigger('ulAnimation', [
                    animations_1.transition("* => fadeIn", [
                        animations_1.style({
                            opacity: 0,
                        }),
                        animations_1.animate(1000, animations_1.style({ opacity: 1 }))
                    ]),
                    animations_1.transition("* => fadeOut", [
                        animations_1.animate(1000, animations_1.style({ opacity: 0 }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            user_service_1.UserService,
            file_service_1.FileService,
            click_service_1.ClickService,
            router_1.Router])
    ], SidemenuComponent);
    return SidemenuComponent;
}());
exports.SidemenuComponent = SidemenuComponent;

//# sourceMappingURL=side-menu.component.js.map
