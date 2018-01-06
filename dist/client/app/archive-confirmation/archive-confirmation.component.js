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

//# sourceMappingURL=archive-confirmation.component.js.map
