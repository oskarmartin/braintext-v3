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
var animations_1 = require("@angular/animations");
var click_service_1 = require("../_services/click.service");
var file_service_1 = require("../_services/file.service");
var user_service_1 = require("../_services/user.service");
var EditorMenuComponent = /** @class */ (function () {
    function EditorMenuComponent(sentenceService, clickService, fileService, userService) {
        var _this = this;
        this.sentenceService = sentenceService;
        this.clickService = clickService;
        this.fileService = fileService;
        this.userService = userService;
        this.newSentence = false;
        this.archiveMenuState = "in";
        this.moveEditorMenu = 'in';
        this.sentenceService.sentenceNum$.subscribe(function (value) {
            console.log("uute lausete arv -> ", value);
            _this.numOfNewSentences = value;
        });
        this.sentenceService.isNewSenActive$.subscribe(function (value) {
            console.log("kas new sentence on active -> ", value);
            _this.newSentence = value;
        });
        this.clickService.archiveClick$.subscribe(function (value) {
            console.log("editor menu archive-slider status -> ", value);
            if (value == false) {
                _this.archiveMenuState = 'in';
                _this.moveEditorMenu = "in";
            }
            else {
                _this.archiveMenuState = 'out';
                _this.moveEditorMenu = "out";
                _this.sentenceService.deActivateNewSen();
            }
        });
    }
    EditorMenuComponent.prototype.zoomIn = function () {
        this.clickService.zoomIn();
    };
    EditorMenuComponent.prototype.zoomOut = function () {
        this.clickService.zoomOut();
    };
    EditorMenuComponent.prototype.toggleArchiveMenu = function () {
        this.archiveMenuState = this.archiveMenuState === 'out' ? 'in' : 'out';
    };
    EditorMenuComponent.prototype.toggleArchive = function () {
        this.clickService.openArchive();
    };
    EditorMenuComponent.prototype.onFileChange = function (event) {
        if (this.sentenceService.getSentenceStringLength() > 0) {
            this.clickService.openConfirmation();
        }
        var files = event.target.files;
        this.saveFiles(files);
    };
    EditorMenuComponent.prototype.removeLast = function () {
        this.clickService.undoLast();
    };
    EditorMenuComponent.prototype.saveFiles = function (files) {
        var _this = this;
        console.log("saveFile initiated from the editor-menu");
        if (files.length > 0) {
            var formData = new FormData();
            formData.append("file", files[0], files[0].name);
            var parameters = {
                userId: JSON.parse(localStorage.getItem('user'))
            };
            this.fileService.upload(formData, parameters).subscribe(function (data) {
                console.log("file upload from editor-menu");
                console.log(data);
                _this.fileService.uploadFromSide(data.filename);
                var id = JSON.parse(localStorage.getItem('user'));
                console.log("editor menu user id -> ", id);
                console.log("editor menu data ->", data.filename);
                _this.userService.addUserLastFile(id, data.filename).subscribe(function (data) {
                    console.log("add user last file in editor menu");
                    console.log(data);
                });
            }, function (error) {
                console.log("there was an error with upload");
            });
        }
    };
    __decorate([
        core_1.HostBinding('@editorMenu'),
        __metadata("design:type", Object)
    ], EditorMenuComponent.prototype, "moveEditorMenu", void 0);
    EditorMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "editor-menu.component.html",
            styleUrls: ['./editor-menu.component.css'],
            selector: 'editor-menu',
            animations: [
                animations_1.trigger('archiveMenuSlideInOut', [
                    animations_1.state('in', animations_1.style({
                        transform: 'translate3d(100%, 0, 0)'
                    })),
                    animations_1.state('out', animations_1.style({
                        transform: 'translate3d(0,0,0)'
                    })),
                    animations_1.transition('in => out', animations_1.animate('400ms ease-in-out')),
                    animations_1.transition('out => in', animations_1.animate('400ms ease-in-out'))
                ]),
                animations_1.trigger('editorMenu', [
                    animations_1.state('in', animations_1.style({
                        marginRight: "0px"
                    })),
                    animations_1.state('out', animations_1.style({
                        marginRight: '300px'
                    })),
                    animations_1.transition('in => out', animations_1.animate('400ms ease-in-out')),
                    animations_1.transition('out => in', animations_1.animate('400ms ease-in-out'))
                ]),
            ]
        }),
        __metadata("design:paramtypes", [sentence_service_1.SentenceService,
            click_service_1.ClickService,
            file_service_1.FileService,
            user_service_1.UserService])
    ], EditorMenuComponent);
    return EditorMenuComponent;
}());
exports.EditorMenuComponent = EditorMenuComponent;

//# sourceMappingURL=editor-menu.component.js.map
