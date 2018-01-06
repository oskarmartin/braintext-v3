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
var click_service_1 = require("../_services/click.service");
var ArchiveConfirmationComponent = /** @class */ (function () {
    function ArchiveConfirmationComponent(clickService) {
        this.clickService = clickService;
    }
    ArchiveConfirmationComponent.prototype.ngOnInit = function () { };
    ArchiveConfirmationComponent.prototype.continueWithSame = function () {
        this.clickService.closeConfirmation();
    };
    ArchiveConfirmationComponent.prototype.openSave = function () {
        this.clickService.closeConfirmation();
        this.clickService.showSaveFileModal();
    };
    ArchiveConfirmationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'archive-confirmation',
            templateUrl: 'archive-confirmation.component.html',
            styleUrls: ['archive-confirmation.component.css']
        }),
        __metadata("design:paramtypes", [click_service_1.ClickService])
    ], ArchiveConfirmationComponent);
    return ArchiveConfirmationComponent;
}());
exports.ArchiveConfirmationComponent = ArchiveConfirmationComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcmNoaXZlLWNvbmZpcm1hdGlvbi9hcmNoaXZlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFFbEQsNERBQTBEO0FBUTFEO0lBQ0ksc0NBQ1ksWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDbkMsQ0FBQztJQUVKLCtDQUFRLEdBQVIsY0FBWSxDQUFDO0lBRWIsdURBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFDRCwrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBYlEsNEJBQTRCO1FBTnhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxXQUFXLEVBQUUscUNBQXFDO1lBQ2xELFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO1NBQ3BELENBQUM7eUNBRzRCLDRCQUFZO09BRjdCLDRCQUE0QixDQWN4QztJQUFELG1DQUFDO0NBZEQsQUFjQyxJQUFBO0FBZFksb0VBQTRCIiwiZmlsZSI6ImFwcC9hcmNoaXZlLWNvbmZpcm1hdGlvbi9hcmNoaXZlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbGlja1NlcnZpY2UgfSBmcm9tICcuLi9fc2VydmljZXMvY2xpY2suc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdhcmNoaXZlLWNvbmZpcm1hdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICdhcmNoaXZlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2FyY2hpdmUtY29uZmlybWF0aW9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBcmNoaXZlQ29uZmlybWF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjbGlja1NlcnZpY2U6IENsaWNrU2VydmljZVxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge31cblxuICAgIGNvbnRpbnVlV2l0aFNhbWUoKXtcbiAgICAgICAgdGhpcy5jbGlja1NlcnZpY2UuY2xvc2VDb25maXJtYXRpb24oKTtcbiAgICB9XG4gICAgb3BlblNhdmUoKXtcbiAgICAgICAgdGhpcy5jbGlja1NlcnZpY2UuY2xvc2VDb25maXJtYXRpb24oKTtcbiAgICAgICAgdGhpcy5jbGlja1NlcnZpY2Uuc2hvd1NhdmVGaWxlTW9kYWwoKTtcbiAgICB9XG59XG4iXX0=
