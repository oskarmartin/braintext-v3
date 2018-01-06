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
var sentence_service_1 = require("../_services/sentence.service");
var user_service_1 = require("../_services/user.service");
var ArchiveFileComponent = /** @class */ (function () {
    function ArchiveFileComponent(clickService, sentenceService, userService) {
        this.clickService = clickService;
        this.sentenceService = sentenceService;
        this.userService = userService;
        this.fileNamePlaceholder = "filename.pdf";
        this.checkBoxStatus = false;
    }
    ArchiveFileComponent.prototype.ngOnInit = function () {
        console.log("archive-file component initiated!");
        this.clickService.closeArchive();
    };
    ArchiveFileComponent.prototype.closeSaveFileModal = function () {
        this.clickService.closeSaveFileModal();
    };
    ArchiveFileComponent.prototype.changeCheckValue = function () {
        var firstname = JSON.parse(localStorage.getItem('firstname'));
        var lastname = JSON.parse(localStorage.getItem('lastname'));
        this.checkBoxStatus = !this.checkBoxStatus;
        if (this.checkBoxStatus == true) {
            this.fileNamePlaceholder = firstname + "-" + lastname + "-filename.pdf";
        }
        if (this.checkBoxStatus == false) {
            this.fileNamePlaceholder = "filename.pdf";
        }
    };
    ArchiveFileComponent.prototype.saveArchive = function () {
        var _this = this;
        var text = this.sentenceService.getSentenceString();
        var id = JSON.parse(localStorage.getItem('user'));
        console.log(text);
        console.log(this.fileNamePlaceholder);
        this.userService.archiveUserFile(id, this.fileNamePlaceholder, text).subscribe(function (data) {
            _this.clickService.closeSaveFileModal();
            _this.sentenceService.clearSentenceString();
            _this.clickService.showAlertBox();
            _this.sentenceService.clearArchive();
            setTimeout(function () {
                _this.clickService.hideAlertBox();
            }, 5000);
        });
    };
    ArchiveFileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'archive-file',
            templateUrl: 'archive-file.component.html',
            styleUrls: ['archive-file.component.css']
        }),
        __metadata("design:paramtypes", [click_service_1.ClickService,
            sentence_service_1.SentenceService,
            user_service_1.UserService])
    ], ArchiveFileComponent);
    return ArchiveFileComponent;
}());
exports.ArchiveFileComponent = ArchiveFileComponent;

//# sourceMappingURL=archive-file.component.js.map
