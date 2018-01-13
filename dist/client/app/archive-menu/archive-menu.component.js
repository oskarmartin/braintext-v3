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

//# sourceMappingURL=archive-menu.component.js.map
