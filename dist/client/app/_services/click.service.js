"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var ClickService = /** @class */ (function () {
    function ClickService() {
        this.archiveClick = new Subject_1.Subject();
        this.archiveBarStatus = false;
        this.archiveClick$ = this.archiveClick.asObservable();
        this.bodyClick = new Subject_1.Subject();
        this.bodyMoveStatus = false;
        this.bodyClick$ = this.bodyClick.asObservable();
        this.zoomStatus = new Subject_1.Subject();
        this.zoomStatusNumber = 1;
        this.zoomStatus$ = this.zoomStatus.asObservable();
        this.undoClick = new Subject_1.Subject();
        this.undoClick$ = this.undoClick.asObservable();
        this.saveFile = new Subject_1.Subject();
        this.saveFileStatus = false;
        this.saveFile$ = this.saveFile.asObservable();
        this.archiveConfirmation = new Subject_1.Subject();
        this.archiveConfirmation$ = this.archiveConfirmation.asObservable();
        this.sideMenu = new Subject_1.Subject();
        this.sideMenuStatus = 'in';
        this.sideMenu$ = this.sideMenu.asObservable();
        this.alertBox = new Subject_1.Subject();
        this.alertBoxStatus = false;
        this.alertBox$ = this.alertBox.asObservable();
        this.zoomLevel = new Subject_1.Subject();
        this.zoomInt = 0.8;
        this.zoomLevel$ = this.zoomLevel.asObservable();
        /*zoomIn(zi: number){
            this.zoomStatusNumber = this.zoomStatusNumber + zi;
            if(zi > 1.5){
                zi = 1.5;
                this.zoomStatusNumber = zi;
            }
            this.zoomStatus.next(this.zoomStatusNumber);
    
        }
        zoomOut(zo: number){
            if(zo < 0.5){
                zo = 0.5;
                this.zoomStatusNumber = zo;
    
            }
            this.zoomStatus.next(this.zoomStatusNumber);
        }*/
    }
    ClickService.prototype.zoomIn = function () {
        console.log(this.zoomInt);
        this.zoomInt += 0.1;
        this.zoomLevel.next(this.zoomInt);
    };
    ClickService.prototype.zoomOut = function () {
        console.log(this.zoomInt);
        this.zoomInt -= 0.1;
        this.zoomLevel.next(this.zoomInt);
    };
    ClickService.prototype.openArchive = function () {
        this.archiveClick.next(this.archiveBarStatus = !this.archiveBarStatus);
    };
    ClickService.prototype.closeArchive = function () {
        this.archiveClick.next(false);
    };
    ClickService.prototype.moveBody = function () {
        this.bodyClick.next(this.bodyMoveStatus = !this.bodyMoveStatus);
    };
    ClickService.prototype.closeBody = function () {
        this.bodyClick.next(false);
    };
    ClickService.prototype.undoLast = function () {
        this.undoClick.next(true);
    };
    ClickService.prototype.showSaveFileModal = function () {
        this.saveFile.next(true);
    };
    ClickService.prototype.closeSaveFileModal = function () {
        this.saveFile.next(false);
    };
    ClickService.prototype.openSideMenu = function () {
        this.sideMenu.next('out');
    };
    ClickService.prototype.closeSideMenu = function () {
        this.sideMenu.next('in');
    };
    ClickService.prototype.showAlertBox = function () {
        this.alertBox.next(true);
    };
    ClickService.prototype.hideAlertBox = function () {
        this.alertBox.next(false);
    };
    ClickService.prototype.openConfirmation = function () {
        this.archiveConfirmation.next(true);
    };
    ClickService.prototype.closeConfirmation = function () {
        this.archiveConfirmation.next(false);
    };
    ClickService = __decorate([
        core_1.Injectable()
    ], ClickService);
    return ClickService;
}());
exports.ClickService = ClickService;

//# sourceMappingURL=click.service.js.map
