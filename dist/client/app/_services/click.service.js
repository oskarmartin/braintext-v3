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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fc2VydmljZXMvY2xpY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUUzQyx3Q0FBdUM7QUFHdkM7SUFEQTtRQUdZLGlCQUFZLEdBQUcsSUFBSSxpQkFBTyxFQUFXLENBQUM7UUFDdEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQzFDLGtCQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6QyxjQUFTLEdBQUcsSUFBSSxpQkFBTyxFQUFXLENBQUM7UUFDbkMsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDeEMsZUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFbkMsZUFBVSxHQUFHLElBQUksaUJBQU8sRUFBVSxDQUFDO1FBQ25DLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUNyQyxnQkFBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFckMsY0FBUyxHQUFHLElBQUksaUJBQU8sRUFBVyxDQUFDO1FBQzNDLGVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRW5DLGFBQVEsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUNsQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUN4QyxjQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVqQyx3QkFBbUIsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUNyRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkQsYUFBUSxHQUFHLElBQUksaUJBQU8sRUFBVSxDQUFDO1FBQ2pDLG1CQUFjLEdBQVcsSUFBSSxDQUFDO1FBQ3RDLGNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRWpDLGFBQVEsR0FB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Y2suc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqcy9TdWJqZWN0XCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDbGlja1NlcnZpY2V7XG5cbiAgICBwcml2YXRlIGFyY2hpdmVDbGljayA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgcHJpdmF0ZSBhcmNoaXZlQmFyU3RhdHVzOiBib29sZWFuID0gZmFsc2U7XG4gICAgYXJjaGl2ZUNsaWNrJCA9IHRoaXMuYXJjaGl2ZUNsaWNrLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBib2R5Q2xpY2sgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHByaXZhdGUgYm9keU1vdmVTdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBib2R5Q2xpY2skID0gdGhpcy5ib2R5Q2xpY2suYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBwcml2YXRlIHpvb21TdGF0dXMgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgcHJpdmF0ZSB6b29tU3RhdHVzTnVtYmVyOiBudW1iZXIgPSAxO1xuICAgIHpvb21TdGF0dXMkID0gdGhpcy56b29tU3RhdHVzLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSB1bmRvQ2xpY2sgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHVuZG9DbGljayQgPSB0aGlzLnVuZG9DbGljay5hc09ic2VydmFibGUoKTtcblxuICAgIHByaXZhdGUgc2F2ZUZpbGUgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHByaXZhdGUgc2F2ZUZpbGVTdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzYXZlRmlsZSQgPSB0aGlzLnNhdmVGaWxlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBhcmNoaXZlQ29uZmlybWF0aW9uID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgICBhcmNoaXZlQ29uZmlybWF0aW9uJCA9IHRoaXMuYXJjaGl2ZUNvbmZpcm1hdGlvbi5hc09ic2VydmFibGUoKTtcblxuICAgIHByaXZhdGUgc2lkZU1lbnUgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgcHJpdmF0ZSBzaWRlTWVudVN0YXR1czogc3RyaW5nID0gJ2luJztcbiAgICBzaWRlTWVudSQgPSB0aGlzLnNpZGVNZW51LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBhbGVydEJveCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgcHJpdmF0ZSBhbGVydEJveFN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFsZXJ0Qm94JCA9IHRoaXMuYWxlcnRCb3guYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBwcml2YXRlIHpvb21MZXZlbCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgICBwcml2YXRlIHpvb21JbnQ6IG51bWJlciA9IDAuODtcbiAgICB6b29tTGV2ZWwkID0gdGhpcy56b29tTGV2ZWwuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICB6b29tSW4oKXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy56b29tSW50KTtcbiAgICAgICAgdGhpcy56b29tSW50ICs9IDAuMTtcbiAgICAgICAgdGhpcy56b29tTGV2ZWwubmV4dCh0aGlzLnpvb21JbnQpO1xuICAgIH1cbiAgICB6b29tT3V0KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuem9vbUludClcbiAgICAgICAgdGhpcy56b29tSW50IC09IDAuMTtcbiAgICAgICAgdGhpcy56b29tTGV2ZWwubmV4dCh0aGlzLnpvb21JbnQpO1xuICAgIH1cbiAgICBvcGVuQXJjaGl2ZSgpe1xuICAgICAgICB0aGlzLmFyY2hpdmVDbGljay5uZXh0KHRoaXMuYXJjaGl2ZUJhclN0YXR1cyA9ICF0aGlzLmFyY2hpdmVCYXJTdGF0dXMpO1xuICAgIH1cbiAgICBjbG9zZUFyY2hpdmUoKXtcbiAgICAgICAgdGhpcy5hcmNoaXZlQ2xpY2submV4dChmYWxzZSk7XG4gICAgfVxuICAgIG1vdmVCb2R5KCl7XG4gICAgICAgIHRoaXMuYm9keUNsaWNrLm5leHQodGhpcy5ib2R5TW92ZVN0YXR1cyA9ICF0aGlzLmJvZHlNb3ZlU3RhdHVzKTtcbiAgICB9XG4gICAgY2xvc2VCb2R5KCl7XG4gICAgICAgIHRoaXMuYm9keUNsaWNrLm5leHQoZmFsc2UpO1xuICAgIH1cbiAgICB1bmRvTGFzdCgpe1xuICAgICAgICB0aGlzLnVuZG9DbGljay5uZXh0KHRydWUpO1xuICAgIH1cbiAgICBzaG93U2F2ZUZpbGVNb2RhbCgpe1xuICAgICAgICB0aGlzLnNhdmVGaWxlLm5leHQodHJ1ZSlcbiAgICB9XG4gICAgY2xvc2VTYXZlRmlsZU1vZGFsKCl7XG4gICAgICAgIHRoaXMuc2F2ZUZpbGUubmV4dChmYWxzZSk7XG4gICAgfVxuICAgIG9wZW5TaWRlTWVudSgpe1xuICAgICAgICB0aGlzLnNpZGVNZW51Lm5leHQoJ291dCcpO1xuICAgIH1cbiAgICBjbG9zZVNpZGVNZW51KCl7XG4gICAgICAgIHRoaXMuc2lkZU1lbnUubmV4dCgnaW4nKTtcbiAgICB9XG4gICAgc2hvd0FsZXJ0Qm94KCl7XG4gICAgICAgIHRoaXMuYWxlcnRCb3gubmV4dCh0cnVlKTtcbiAgICB9XG4gICAgaGlkZUFsZXJ0Qm94KCl7XG4gICAgICAgIHRoaXMuYWxlcnRCb3gubmV4dChmYWxzZSk7XG4gICAgfVxuICAgIG9wZW5Db25maXJtYXRpb24oKXtcbiAgICAgICAgdGhpcy5hcmNoaXZlQ29uZmlybWF0aW9uLm5leHQodHJ1ZSk7XG4gICAgfVxuICAgIGNsb3NlQ29uZmlybWF0aW9uKCl7XG4gICAgICAgIHRoaXMuYXJjaGl2ZUNvbmZpcm1hdGlvbi5uZXh0KGZhbHNlKTtcbiAgICB9XG4gICAgLyp6b29tSW4oemk6IG51bWJlcil7XG4gICAgICAgIHRoaXMuem9vbVN0YXR1c051bWJlciA9IHRoaXMuem9vbVN0YXR1c051bWJlciArIHppO1xuICAgICAgICBpZih6aSA+IDEuNSl7XG4gICAgICAgICAgICB6aSA9IDEuNTtcbiAgICAgICAgICAgIHRoaXMuem9vbVN0YXR1c051bWJlciA9IHppO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuem9vbVN0YXR1cy5uZXh0KHRoaXMuem9vbVN0YXR1c051bWJlcik7XG5cbiAgICB9XG4gICAgem9vbU91dCh6bzogbnVtYmVyKXtcbiAgICAgICAgaWYoem8gPCAwLjUpe1xuICAgICAgICAgICAgem8gPSAwLjU7XG4gICAgICAgICAgICB0aGlzLnpvb21TdGF0dXNOdW1iZXIgPSB6bztcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuem9vbVN0YXR1cy5uZXh0KHRoaXMuem9vbVN0YXR1c051bWJlcik7XG4gICAgfSovXG5cblxufVxuIl19
