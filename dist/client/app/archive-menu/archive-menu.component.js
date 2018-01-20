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
var sentence_service_1 = require("../_services/sentence.service");
var click_service_1 = require("../_services/click.service");
var animations_1 = require("@angular/animations");
var ArchivemenuComponent = /** @class */ (function () {
    function ArchivemenuComponent(sentenceService, clickService) {
        var _this = this;
        this.sentenceService = sentenceService;
        this.clickService = clickService;
        this.archivedSentences = [];
        this.offClick = new core_1.EventEmitter();
        this.sentenceService.emptyArchive$.subscribe(function (value) {
            if (value == true) {
                _this.archivedSentences = [];
            }
        });
        this.sentenceService.sentence$.subscribe(function (data) {
            _this.archivedSentences.unshift(data);
        });
        this.clickService.undoClick$.subscribe(function (data) {
            _this.archivedSentences.shift();
        });
    }
    ArchivemenuComponent.prototype.deleteSentence = function (text) {
        for (var i = this.archivedSentences.length; i >= 0; i--) {
            if (this.archivedSentences[i] === text) {
                this.archivedSentences.splice(i, 1);
            }
        }
    };
    ArchivemenuComponent.prototype.closeArchiveSideMenu = function () {
        this.offClick.emit("close");
    };
    ArchivemenuComponent.prototype.saveSentences = function () {
        this.clickService.showSaveFileModal();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ArchivemenuComponent.prototype, "offClick", void 0);
    ArchivemenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'archive-menu.component.html',
            styleUrls: ['./archive-menu.component.css'],
            selector: "archive-menu",
            animations: [
                animations_1.trigger('flyInOut', [
                    animations_1.state('in', animations_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    animations_1.transition('* => void', [
                        animations_1.animate('0.2s 0.1s ease-out', animations_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [sentence_service_1.SentenceService,
            click_service_1.ClickService])
    ], ArchivemenuComponent);
    return ArchivemenuComponent;
}());
exports.ArchivemenuComponent = ArchivemenuComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcmNoaXZlLW1lbnUvYXJjaGl2ZS1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFnRTtBQUVoRSxrRUFBZ0U7QUFDaEUsNERBQTBEO0FBQzFELGtEQUEyRjtBQXFCM0Y7SUFFSSw4QkFDWSxlQUFnQyxFQUNoQyxZQUEwQjtRQUZ0QyxpQkFlQztRQWRXLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUh0QyxzQkFBaUIsR0FBYSxFQUFFLENBQUM7UUF3QnZCLGFBQVEsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQW5CcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUM5QyxFQUFFLENBQUEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDZCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDekMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDdkMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELDZDQUFjLEdBQWQsVUFBZSxJQUFXO1FBQ3RCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3BELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFHRCxtREFBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsNENBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBUFM7UUFBVCxhQUFNLEVBQUU7OzBEQUErQjtJQXpCL0Isb0JBQW9CO1FBbkJoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7WUFDM0MsUUFBUSxFQUFFLGNBQWM7WUFDeEIsVUFBVSxFQUFFO2dCQUNWLG9CQUFPLENBQUMsVUFBVSxFQUFFO29CQUNsQixrQkFBSyxDQUFDLElBQUksRUFBRSxrQkFBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFDLENBQUMsQ0FBQztvQkFDNUQsdUJBQVUsQ0FBQyxXQUFXLEVBQUU7d0JBQ3RCLG9CQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQUssQ0FBQzs0QkFDbEMsT0FBTyxFQUFFLENBQUM7NEJBQ1YsU0FBUyxFQUFFLGtCQUFrQjt5QkFDOUIsQ0FBQyxDQUFDO3FCQUNKLENBQUM7aUJBQ0wsQ0FBQzthQUNEO1NBRUosQ0FBQzt5Q0FLK0Isa0NBQWU7WUFDbEIsNEJBQVk7T0FKN0Isb0JBQW9CLENBaUNoQztJQUFELDJCQUFDO0NBakNELEFBaUNDLElBQUE7QUFqQ1ksb0RBQW9CIiwiZmlsZSI6ImFwcC9hcmNoaXZlLW1lbnUvYXJjaGl2ZS1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBTZW50ZW5jZVNlcnZpY2UgfSBmcm9tICcuLi9fc2VydmljZXMvc2VudGVuY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1NlcnZpY2UgfSBmcm9tICcuLi9fc2VydmljZXMvY2xpY2suc2VydmljZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSwga2V5ZnJhbWVzICxzdGF0ZX0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJ2FyY2hpdmUtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXJjaGl2ZS1tZW51LmNvbXBvbmVudC5jc3MnXSxcbiAgICBzZWxlY3RvcjogXCJhcmNoaXZlLW1lbnVcIixcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICB0cmlnZ2VyKCdmbHlJbk91dCcsIFtcbiAgICAgICAgc3RhdGUoJ2luJywgc3R5bGUoe29wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXG4gICAgICAgICAgYW5pbWF0ZSgnMC4ycyAwLjFzIGVhc2Utb3V0Jywgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknXG4gICAgICAgICAgfSkpXG4gICAgICAgIF0pXG4gICAgXSlcbiAgICBdXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlbWVudUNvbXBvbmVudCB7XG4gICAgYXJjaGl2ZWRTZW50ZW5jZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2VudGVuY2VTZXJ2aWNlOiBTZW50ZW5jZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2xpY2tTZXJ2aWNlOiBDbGlja1NlcnZpY2VcbiAgICApe1xuICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5lbXB0eUFyY2hpdmUkLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZih2YWx1ZSA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFyY2hpdmVkU2VudGVuY2VzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnNlbnRlbmNlJC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFyY2hpdmVkU2VudGVuY2VzLnVuc2hpZnQoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS51bmRvQ2xpY2skLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXJjaGl2ZWRTZW50ZW5jZXMuc2hpZnQoKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlU2VudGVuY2UodGV4dDpzdHJpbmcpe1xuICAgICAgICBmb3IodmFyIGkgPSB0aGlzLmFyY2hpdmVkU2VudGVuY2VzLmxlbmd0aDsgaSA+PSAwOyBpLS0pe1xuICAgICAgICAgICAgaWYodGhpcy5hcmNoaXZlZFNlbnRlbmNlc1tpXSA9PT0gdGV4dCl7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmNoaXZlZFNlbnRlbmNlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgQE91dHB1dCgpIG9mZkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY2xvc2VBcmNoaXZlU2lkZU1lbnUoKXtcbiAgICAgICAgdGhpcy5vZmZDbGljay5lbWl0KFwiY2xvc2VcIik7XG4gICAgfVxuICAgIHNhdmVTZW50ZW5jZXMoKXtcbiAgICAgICAgdGhpcy5jbGlja1NlcnZpY2Uuc2hvd1NhdmVGaWxlTW9kYWwoKTtcbiAgICB9XG59XG4iXX0=
