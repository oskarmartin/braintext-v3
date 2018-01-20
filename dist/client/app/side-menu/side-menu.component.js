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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWRlLW1lbnUvc2lkZS1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRztBQUNsRywwQ0FBeUM7QUFFekMsMERBQXdEO0FBQ3hELDBEQUF3RDtBQUN4RCxrREFBZ0Y7QUFFaEYsNERBQTBEO0FBc0IxRDtJQVVJLDJCQUNZLFVBQXNCLEVBQ3RCLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLFlBQTBCLEVBQzFCLE1BQWM7UUFKZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFkMUIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUN2QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsZ0JBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBdUJmLGFBQVEsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQWR0QyxDQUFDO0lBQ0gsb0NBQVEsR0FBUjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FB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WSw4Q0FBaUIiLCJmaWxlIjoiYXBwL3NpZGUtbWVudS9zaWRlLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL19zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsZVNlcnZpY2UgfSBmcm9tICcuLi9fc2VydmljZXMvZmlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7IENsaWNrU2VydmljZSB9IGZyb20gXCIuLi9fc2VydmljZXMvY2xpY2suc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcInNpZGUtbWVudS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3NpZGUtbWVudS5jb21wb25lbnQuY3NzJ10sXG4gICAgc2VsZWN0b3I6IFwic2lkZS1tZW51XCIsXG4gICAgYW5pbWF0aW9uczrCoFtcbiAgICAgICAgdHJpZ2dlcigndWxBbmltYXRpb24nLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKFwiKiA9PiBmYWRlSW5cIiwgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKDEwMDAsIHN0eWxlKHtvcGFjaXR5OiAxfSkpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oXCIqID0+IGZhZGVPdXRcIiwgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoMTAwMCwgc3R5bGUoe29wYWNpdHk6IDB9KSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcblxuZXhwb3J0IGNsYXNzIFNpZGVtZW51Q29tcG9uZW50IHtcbiAgICBuYW1lQXJyYXk6IGFueSA9IFtdO1xuICAgIGFyY2hpdmVBcnJheTogYW55ID0gW107XG4gICAgc291cmNlRmlsZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBuYXZNZW51OiBib29sZWFuID0gdHJ1ZTtcbiAgICBiaW5kaW5nVmFyOiBzdHJpbmcgPSBcIlwiO1xuICAgIGFyY2hpdmVGaWxlczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNsaWNrU2VydmljZTogQ2xpY2tTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICAgKXt9XG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgdmFyIGlkOiBzdHJpbmcgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJGaWxlcyhpZCkpO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJGaWxlcyhpZCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIGlzIHRoZSBkYXRhXCIpO1xuICAgICAgICAgICAgdGhpcy5uYW1lQXJyYXkgPSBkYXRhO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lQXJyYXkpO1xuXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldEFyY2hpdmVGaWxlcyhpZCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcmNoaXZlQXJyYXkgPSBkYXRhO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBAT3V0cHV0KCkgb2ZmQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjbG9zZVNpZGVNZW51KCl7XG4gICAgICAgIHRoaXMub2ZmQ2xpY2suZW1pdChcImNsb3NlXCIpO1xuICAgIH1cbiAgICBzaG93U291cmNlKCl7XG4gICAgICAgIHRoaXMubmF2TWVudSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvdXJjZUZpbGVzID0gdHJ1ZTtcbiAgICB9XG4gICAgc2hvd0FyY2hpdmUoKXtcbiAgICAgICAgdGhpcy5uYXZNZW51ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXJjaGl2ZUZpbGVzID0gdHJ1ZTtcbiAgICB9XG4gICAgb25GaWxlQ2hhbmdlKGV2ZW50KXtcbiAgICAgICAgbGV0IGZpbGVzID0gZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICB0aGlzLnNhdmVGaWxlcyhmaWxlcyk7XG4gICAgfVxuICAgIGNoYW5nZU5hdmlnYXRpb24odXJsOnN0cmluZyl7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZC8nKyB1cmxdKTtcbiAgICAgICAgdGhpcy5jbGlja1NlcnZpY2UuY2xvc2VTaWRlTWVudSgpO1xuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS5tb3ZlQm9keSgpO1xuICAgIH1cbiAgICBvcGVuSG9tZSgpe1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XG4gICAgfVxuICAgIG5hdmlnYXRpb25CYWNrKGZyb206c3RyaW5nKXtcbiAgICAgICAgaWYoZnJvbSA9PT0gXCJzb3VyY2VcIil7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZUZpbGVzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5hdk1lbnUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGZyb20gPT09IFwiYXJjaGl2ZVwiKXtcbiAgICAgICAgICAgIHRoaXMuYXJjaGl2ZUZpbGVzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5hdk1lbnUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNhdmVGaWxlcyhmaWxlcyl7XG4gICAgICAgIGlmKGZpbGVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgdmFyIGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiZmlsZVwiLCBmaWxlc1swXSwgZmlsZXNbMF0ubmFtZSk7XG5cbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgICAgIHVzZXJJZDogSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maWxlU2VydmljZS51cGxvYWQoZm9ybURhdGEsIHBhcmFtZXRlcnMpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlU2VydmljZS51cGxvYWRGcm9tU2lkZShkYXRhLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB1cGxvYWRcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG4gICAgb3BlbkZyb21TaWRlTWVudShzcmM6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuZmlsZVNlcnZpY2UudXBsb2FkRnJvbVNpZGUoc3JjKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS5jbG9zZVNpZGVNZW51KCk7XG4gICAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLm1vdmVCb2R5KCk7XG4gICAgfVxufVxuIl19
